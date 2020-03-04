/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import ChartContainer from './Chart/ChartContainer';
import MapboxContainer from './MapboxContainer/MapboxContainer';
import './styles.css';

const App = ({ elevationData, chartHeight, chartMargin }) => {
  const hasElevationData = elevationData.length > 0;
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
    elevationData: state.chart.elevationData,
    chartHeight: state.chart.chartProps.height,
    chartMargin: state.chart.chartProps.margin,
  };
};

export default connect(mapStateToProps, null)(App);
