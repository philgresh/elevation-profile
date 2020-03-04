/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ChartSVG from './chartSVGGenerator';

const ChartContainer = ({ chartProps, elevationData }) => {
  return <ChartSVG chartProps={chartProps} elevationData={elevationData} />;
};

const mapStateToProps = state => {
  return {
    elevationData: state.chart.elevationData,
    chartProps: state.chart.chartProps,
  };
};

export default connect(mapStateToProps, null)(ChartContainer);
