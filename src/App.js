import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import ChartContainer from './Chart/ChartContainer';
import MapboxContainer from './MapboxContainer/MapboxContainer';
import './styles.css';

const App = ({ elevationData }) => {
  const hasElevationData = elevationData.length > 0;

  return (
    <div className="App">
      <Buttons />
      <MapboxContainer />
      {hasElevationData && <ChartContainer />}
    </div>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getElevationData: () => dispatch(getElevationData()),
//     clearPins: () => dispatch(clearPins()),
//   };
// };

const mapStateToProps = state => {
  return {
    elevationData: state.elevationData,
  };
};

export default connect(mapStateToProps, null)(App);
