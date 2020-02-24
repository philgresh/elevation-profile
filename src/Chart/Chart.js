import React from 'react';
import { svgPath } from '../functions';
import styled from 'styled-components';

const Chart = ({ chartOptions: { width = 500, height = 200 }, waterline }) => {
  let waterPath = null;
  if (waterline) {
    const d = `M 0,${height - height * waterline} H ${width}`;
    waterPath = (
      <path
        d={d}
        stroke="blue"
        stroke-width="1"
        stroke-dasharray="5,5"
        fill="none"
      />
    );
  }
  return (
    <div>
      <svg
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height * 1.2}`}
      >
        {path}
        {waterPath}
      </svg>
    </div>
  );
};

const StyledChart = styled(Chart)`
  border: 2px solid blue;
`;

export default StyledChart;
