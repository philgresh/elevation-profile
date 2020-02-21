import React from 'react';

export async function setUpGetPoints(points, samples = 100) {
  let path = '';
  points.forEach(({ lat, lon }, index) => {
    // console.log(lat, lon);
    path += `${lat},${lon}`;
    if (index !== points.length - 1) path += '|';
  });
  const params = {
    samples,
    key: 'AIzaSyBP7L7PhTrk0pv8cZDbapLAfX6B3ldaHfE',
    path
  };
  const url =
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json';
  return { url, params };
}

export function transcribePoints(inputArr, filterFunction) {
  console.log(inputArr, filterFunction);
  const results = filterFunction ? inputArr.filter(filterFunction) : inputArr;
  const first = results[0].location.lng;
  const last = results[results.length - 1].location.lng;
  const eastToWest = first > last;
  const westToEast = first < last;

  const crossesAntimeridianEastToWest = eastToWest && first > 0 && last < 0;
  const crossesAntimeridianWestToEast = westToEast && first < 0 && last > 0;

  let yMin = Infinity;
  let yMax = -Infinity;
  const points = results.map(({ elevation, location: { lng } }) => {
    let x = lng;
    if (crossesAntimeridianEastToWest && lng < 0) {
      x = 180 + (180 + lng);
    }
    if (crossesAntimeridianWestToEast && lng > 0) {
      x = -180 - (180 - lng);
    }
    yMin = Math.min(yMin, elevation);
    yMax = Math.max(yMax, elevation);
    return {
      x,
      elevation
    };
  });

  // Normalize to [0-1] range
  const xMin = points[0].x;
  const xMax = points[points.length - 1].x;
  const waterline = (0 - yMin) / (yMax - yMin);
  const normalizedPoints = points.map(({ x, elevation }) => ({
    x: (x - xMin) / (xMax - xMin),
    y: (elevation - yMin) / (yMax - yMin)
    // y: elevation
  }));

  // console.table(waterline);
  return { normalizedPoints, yMin, yMax, waterline };
}

// Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
    angle: Math.atan2(lengthY, lengthX)
  };
};

// Position of a control point
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse, smoothing) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;

  // Properties of the opposed-line
  const o = line(p, n);

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a, smoothing) => {
  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point, false, smoothing);

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true, smoothing);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
};

// Render the svg <path> element
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element

// eslint-disable-next-line max-len
export function svgPath(points, pathProps, smoothing = 0.1, command = bezierCommand) {
  // Borrowed from https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  // https://codepen.io/francoisromain/pen/dzoZZj?editors=1010
  const { fill = 'none', stroke = 'grey', strokeWidth = '3px' } = pathProps;
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a, smoothing)}`,
    ''
  );
  return (
    <>
      <path d={`${d}`} fill={`${fill}`} stroke={`${stroke}`} strokeWidth={`${strokeWidth}`} />
    </>
  );
}
