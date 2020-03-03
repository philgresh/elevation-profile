/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import { extent } from 'd3-array';
import { axisLeft } from 'd3-axis';
import { scaleDiverging, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { line as d3line, curveMonotoneX } from 'd3-shape';
import { interpolateRdBu } from 'd3-scale-chromatic';

const ChartSVG = ({ chartOptions, elevationData }) => {
  const { width, height, margin } = chartOptions;

  const ref = useRef();

  useEffect(() => {
    const svg = select(ref.current);
    svg.attr('viewBox', [0, 0, width, height]);

    // const { minElev, maxElev } = elevationData.reduce(
    //   (acc, point) => {
    //     let { min, max } = acc;
    //     min = Math.min(min, point.elevation);
    //     max = Math.max(max, point.elevation);
    //     return { min, max };
    //   },
    //   { minElev: Infinity, maxElev: -Infinity },
    // );

    const color = scaleDiverging(t => interpolateRdBu(1 - t)).domain([
      -11000,
      0,
      9000,
    ]);

    const x = scaleLinear()
      .domain([0, elevationData.length])
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(elevationData, r => r.elevation))
      // .domain([minElev, maxElev])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        // .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        .call(g => g.select('.domain').remove());

    const yAxis = g =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y))
        .call(g => g.select('.domain').remove())
        .call(g =>
          g
            .select('.tick:last-of-type text')
            .append('tspan')
            .text(' meters'),
        );

    // const scaleIndex = scaleLinear()
    //   .domain([0, elevationData.length])
    //   .range([10, width - 10]);

    // const scaleElev = scaleLinear()
    //   .domain([maxElev, minElev])
    //   .range([10, height]);

    const line = d3line()
      .curve(curveMonotoneX)
      .defined(d => !Number.isNaN(d.elevation))
      .x(d => x(d.index))
      .y(d => y(d.elevation));

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    const svgDefs = svg.append('defs');

    const mainGradient = svgDefs
      .append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient
      .attr('id', 'gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', height - margin.bottom)
      .attr('x2', 0)
      .attr('y2', margin.top)
      .selectAll('stop')
      .join('stop')
      .attr('offset', d => d)
      .attr('stop-color', color.interpolator());

    svg
      .append('path')
      .datum(elevationData)
      .attr('fill', 'transparent')
      // .attr('stroke', 'url(#gradient)')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line)
      // .style('stroke', 'url(#gradient)');
      .style('stroke', '#222');
  }, [elevationData]);
  return <svg ref={ref} />;
};

export default ChartSVG;
