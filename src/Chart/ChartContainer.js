/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ChartSVG from './chartSVGGenerator';

const ChartContainer = ({ chartOptions, elevationData }) => {
  return <ChartSVG chartOptions={chartOptions} elevationData={elevationData} />;
};

const mapStateToProps = state => {
  return {
    elevationData: state.elevationData,
    chartOptions: state.chartOptions,
  };
};

export default connect(mapStateToProps, null)(ChartContainer);
