const initState = {
  mapProps: {
    mapHeight: '100vh',
  },
  pins: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'PUSH_PIN': {
      const newPins = [...state.pins, action.pin];
      return {
        ...state,
        pins: newPins,
      };
    }
    case 'SET_PINS': {
      return {
        ...state,
        pins: [...action.pins],
      };
    }
    case 'CLEAR_PINS': {
      return {
        ...initState,
        pins: [],
        elevationData: [],
      };
    }

    case 'SET_MAP_HEIGHT_FULL': {
      return {
        ...state,
        mapProps: {
          ...state.mapProps,
          mapHeight: '100vh',
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
