const fitMapToPins = pins => {
  let northEast = {};
  let southWest = {};

  return { northEast, southWest };
};

export const setMapHeight = mapHeight => dispatch =>
  dispatch({ mapHeight, type: 'SET_MAP_HEIGHT' });

export const pushPinAction = pin => {
  return dispatch => dispatch({ type: 'PUSH_PIN', pin });
};

export const setPinsAction = pins => {
  return dispatch => dispatch({ type: 'SET_PINS', pins });
};

export const clearPinsAction = () => {
  return dispatch => {
    dispatch({ type: 'CLEAR_PINS' });
    dispatch({
      type: 'SET_ELEVATION_DATA',
      elevationData: [],
    });
    dispatch({
      type: 'SET_MAP_HEIGHT',
      mapHeight: '100vh',
    });
  };
};

export default pushPinAction;
