import axios from 'axios';
// import fetch from 'cross-fetch';
const NUM_SAMPLES = 100;

const replotPointsNearAntimeridian = pins =>
  pins.map(([lng, lat]) => {
    let newLng = lng;
    if (lng > 180) newLng -= 360;
    if (lng < -180) newLng += 360;
    return [newLng, lat];
  });

const getURLParams = async pins => {
  const samples = Math.min(NUM_SAMPLES * (pins.length - 1), 500);
  const newPins = replotPointsNearAntimeridian(pins);
  const key = process.env.REACT_APP_GOOGLE_MAPS_ELEV_API_KEY;
  const path = newPins.reduce((acc, [lng, lat], index) => {
    let newAcc = `${acc}${lat},${lng}`;
    if (index !== newPins.length - 1) newAcc += '|';
    return newAcc;
  }, '');
  const params = {
    samples,
    path,
    key,
  };
  const url =
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json';
  return { url, params };
};

const indexedElevData = data => {
  return data.results.map((p, index) => ({
    index,
    elevation: p.elevation,
    lat: p.location.lat,
    lng: p.location.lng,
  }));
};

export const setSubmitting = ({ submitting }) => {
  return dispatch => {
    dispatch({ submitting, type: 'SET_SUBMITTING' });
  };
};

export const getElevationDataAction = () => {
  return async (dispatch, getState) => {
    const { map } = getState();
    const { pins } = map;

    dispatch(setSubmitting({ submitting: true }));

    const { url, params } = await getURLParams(pins);

    // eslint-disable-next-line no-return-await
    return await axios
      .get(url, { params })
      .then(({ data }) => {
        const indexedData = indexedElevData(data);
        dispatch({
          type: 'SET_ELEVATION_DATA',
          elevationData: [...indexedData],
        });
        dispatch({ type: 'SET_MAP_HEIGHT', mapHeight: '75vh' });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => dispatch(setSubmitting({ submitting: false })));
  };
};
