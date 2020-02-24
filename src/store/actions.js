import axios from 'axios';
import fetch from 'cross-fetch';
const replotPointsNearAntimeridian = pins => {
  const newPins = pins.map(([lng, lat]) => {
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    return [lng, lat];
  });
  return newPins;
};
async function setUpGetPoints(pins, samples = 100) {
  const newPins = replotPointsNearAntimeridian(pins);
  const path = newPins.reduce((acc, [lng, lat], index) => {
    acc += `${lat},${lng}`;
    if (index !== newPins.length - 1) acc += '|';
    return acc;
  }, '');
  const params = {
    samples,
    path,
    key: 'AIzaSyBP7L7PhTrk0pv8cZDbapLAfX6B3ldaHfE',
  };
  const url =
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json';
  // 'https://maps.googleapis.com/maps/api/elevation/json';
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
  return (dispatch, getState) => {
    dispatch({ type: 'SET_SUBMITTING', submitting: submitting });
  };
};

export const clearPins = () => dispatch => dispatch({ type: 'CLEAR_PINS' });

export const getElevationData = () => {
  return async (dispatch, getState) => {
    const { pins, submitting } = getState();

    dispatch(setSubmitting({ submitting: true }));

    const { url, params } = await setUpGetPoints(pins);

    return await axios
      .get(url, { params })
      .then(({ data }) => {
        const indexedData = indexedElevData(data);
        dispatch({
          type: 'SET_ELEVATION_DATA',
          elevationData: indexedData,
          mapHeight: '80vh',
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => dispatch(setSubmitting({ submitting: false })));
  };
};

export const pushPin = pin => {
  return dispatch => dispatch({ type: 'PUSH_PIN', pin });
};

export const setPins = pins => {
  return dispatch => dispatch({ type: 'SET_PINS', pins });
};
