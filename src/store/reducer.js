const initState = {
  pins: [
    [-116.818009, 36.240697],
    [-118.292394, 36.578458],
  ],
  elevationData: [],
  submitting: false,
  mapHeight: '100vh',
  chartOptions: {
    width: window.innerWidth - 50,
    height: 200,
    smoothingFactor: 0.1,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_SUBMITTING': {
      return {
        ...state,
        submitting: action.submitting,
      };
    }
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
      };
    }
    case 'SET_ELEVATION_DATA': {
      // const newElevData = [...state.elevationData, ...action.elevationData];

      return {
        ...state,
        elevationData: action.elevationData,
        mapHeight: action.mapHeight,
      };
    }
    default:
      return state;
  }
};

export default reducer;
