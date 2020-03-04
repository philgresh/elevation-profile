const fitMapToPins = pins => {
  let northEast = {};
  let southWest = {};

  return { northEast, southWest };
};

export const setMapHeightFull = () => dispatch =>
  dispatch({ type: 'SET_MAP_HEIGHT_FULL' });

export const setMapHeightWithChart = mapHeight => dispatch =>
  dispatch({ mapHeight, type: 'SET_MAP_HEIGHT_WITH_CHART' });

export const pushPinAction = pin => {
  return dispatch => dispatch({ type: 'PUSH_PIN', pin });
};

export const setPinsAction = pins => {
  return dispatch => dispatch({ type: 'SET_PINS', pins });
};

export const clearPinsAction = () => dispatch =>
  dispatch({ type: 'CLEAR_PINS' });

export default pushPinAction;
