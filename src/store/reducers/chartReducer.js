const initState = {
  elevationData: [],
  submitting: false,
  chartProps: {
    width: window.innerWidth - 50,
    height: '200',
    margin: { top: 20, right: 100, bottom: 20, left: 100 },
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

    case 'SET_ELEVATION_DATA': {
      return {
        ...state,
        elevationData: [...action.elevationData],
        mapProps: {
          ...state.mapProps,
          mapHeight: action.mapHeight,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
