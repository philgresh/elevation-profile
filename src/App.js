/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import ChartContainer from './Chart/ChartContainer';
import MapboxContainer from './MapboxContainer/MapboxContainer';
import './styles.css';

const App = ({ hasElevationData, chartHeight, chartMargin }) => {
  const chartMargins = chartMargin.top + chartMargin.bottom;
  const mapHeight = hasElevationData
    ? `calc(100vh - ${chartHeight}px - ${chartMargins}px)`
    : '100vh';
  return (
    <div className="App">
      <Buttons />
      <MapboxContainer mapHeight={mapHeight} />
      {hasElevationData && <ChartContainer />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hasElevationData: state.elevationData.length > 0,
    chartHeight: state.chartOptions.height,
    chartMargin: state.chartOptions.margin,
  };
};

export default connect(mapStateToProps, null)(App);
