/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import { extent, ticks } from 'd3-array';
import { axisLeft } from 'd3-axis';
import { scaleDiverging, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { line as d3line, curveNatural } from 'd3-shape';
import { interpolateRdYlBu } from 'd3-scale-chromatic';
import SvgLines from 'react-mt-svg-lines';

const ChartSVG = ({ chartProps, elevationData }) => {
  const { width, height, margin } = chartProps;

  const mainRef = useRef();

  useEffect(() => {
    selectAll('svg > *').remove();
    const mainSVG = select(mainRef.current);
    const elevExtent = extent(elevationData, point => point.elevation);
    const color = scaleDiverging(t => interpolateRdYlBu(1 - t)).domain(
      elevExtent,
    );

    const x = scaleLinear()
      .domain([0, elevationData.length])
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(elevExtent)
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
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

    const elevCurve = d3line()
      .curve(curveNatural)
      .defined(d => !Number.isNaN(d.elevation))
      .x(d => x(d.index))
      .y(d => y(d.elevation));

    // console.log({
    //   zero: y(0),
    //   elev0: y(elevExtent[0]),
    //   elev1: y(elevExtent[1]),
    // });
    if (y(0) < y(elevExtent[0]) || y(0) > y(elevExtent[1])) {
      mainSVG
        .append('line')
        .attr('id', 'waterline')
        .style('stroke', 'lightblue')
        .style('stroke-opacity', 0.5)
        .style('fill', '#')
        .style('stroke-width', 2)
        .style('stroke-dasharray', '10 5 10')
        .attr('x1', margin.left)
        .attr('y1', y(0))
        .attr('x2', width - margin.right)
        .attr('y2', y(0));
    }

    mainSVG.append('g').call(xAxis);
    mainSVG.append('g').call(yAxis);

    const mainSVGDefs = mainSVG.append('defs');

    const mainGradient = mainSVGDefs
      .append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient
      .attr('id', 'gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', margin.left)
      .attr('y1', margin.top)
      .attr('x2', width - margin.right)
      .attr('y2', height - margin.bottom)
      .selectAll('stop')
      .data(ticks(0, 1, 10))
      .join('stop')
      .attr('offset', d => d)
      .attr('stop-color', color.interpolator());

    mainSVG
      .append('path')
      .datum(elevationData)
      .attr('fill', 'transparent')
      .attr('stroke', 'url(#gradient)')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', elevCurve);
  }, [elevationData]);
  return (
    <SvgLines animate duration={500}>
      <svg ref={mainRef} viewBox={`0, 0, ${width}, ${height}`} />
    </SvgLines>
  );
};

export default ChartSVG;
