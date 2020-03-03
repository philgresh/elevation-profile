import axios from 'axios';
// import fetch from 'cross-fetch';
const replotPointsNearAntimeridian = pins => {
  const newPins = pins.map(([lng, lat]) => {
    let newLng = lng;
    if (lng > 180) newLng -= 360;
    if (lng < -180) newLng += 360;
    return [newLng, lat];
  });
  return newPins;
};
async function setUpGetPoints(pins, samples = 100) {
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
    process.env.NODE_ENV === 'production'
      ? 'https://maps.googleapis.com/maps/api/elevation/json'
      : 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json';
  return { url, params };
}

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

export const clearPinsAction = () => dispatch =>
  dispatch({ type: 'CLEAR_PINS' });

export const getElevationDataAction = () => {
  return async (dispatch, getState) => {
    const { pins } = getState();

    dispatch(setSubmitting({ submitting: true }));

    const { url, params } = await setUpGetPoints(pins);

    // eslint-disable-next-line no-return-await
    return await axios
      .get(url, { params })
      .then(({ data }) => {
        const indexedData = indexedElevData(data);
        dispatch({
          type: 'SET_ELEVATION_DATA',
          elevationData: [...indexedData],
          mapHeight: '75vh',
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => dispatch(setSubmitting({ submitting: false })));
  };
};

export const pushPinAction = pin => {
  return dispatch => dispatch({ type: 'PUSH_PIN', pin });
};

export const setPinsAction = pins => {
  return dispatch => dispatch({ type: 'SET_PINS', pins });
};
