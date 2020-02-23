import React from 'react';
import { scaleLinear } from 'd3-scale';
import { line as d3line } from 'd3-shape';
// import Chart from './Chart';

const elevReducer = data =>
  data.reduce(
    (acc, point) => {
      let { minElev, maxElev } = acc;
      minElev = Math.min(minElev, point.elevation);
      maxElev = Math.max(maxElev, point.elevation);
      return { minElev, maxElev };
    },
    { minElev: Infinity, maxElev: -Infinity },
  );

const ChartContainer = ({ chartOptions, smoothingFactor, elevationData }) => {
  const { width, height } = chartOptions;
  const { minElev, maxElev } = elevReducer(elevationData);

  const scaleIndex = scaleLinear()
    .domain([0, elevationData.length])
    .range([10, width - 10]);

  const scaleElev = scaleLinear()
    .domain([maxElev, minElev])
    .range([10, height]);

  const line = d3line()
    .x(p => scaleIndex(p.index))
    .y(p => scaleElev(p.elevation));

  const svgPath = line(elevationData);

  return (
    <>
      {/* <Chart chartOptions={chartOptions} /> */}
      <svg width={width} height={height}>
        <path d={svgPath} stroke="black" strokeWidth="0.3" fill="none" />
      </svg>
    </>
  );
};

export default ChartContainer;
