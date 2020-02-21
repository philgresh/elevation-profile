import React, { useState } from 'react';
// import update from "immutability-helper";
import axios from 'axios';
import { transcribePoints, setUpGetPoints, svgPath } from './functions';
import Chart from './Chart';
import Inputs from './Input';
import MapboxContainer from './MapboxContainer/MapboxContainer';
import './styles.css';

const width = 500;
const height = 200;
const numSamplePoints = 100;
const smoothingFactor = 0.1;
// let waterline = -100000;

// function everyTenth(arr) {
//   return arr.filter((e, i) => i % 10 === 10 - 1);
// }

export default function App() {
  const [submitting, setSubmitting] = useState(false);
  async function getDataOnClick(points) {
    setSubmitting(true);

    const { url, params } = await setUpGetPoints(points, numSamplePoints);
    await axios({
      method: process.env.NODE_ENV === 'production' ? 'post' : 'get',
      url: url,
      params,
    })
      .then(resp => {
        const {
          data: { status, results },
        } = resp;
        if (status === 'OK') {
          console.log(results);
          // console.log({ results });
          // eslint-disable-next-line max-len
          // const { normalizedPoints, yMin, yMax, waterline: wl } = transcribePoints(
          //   results,
          //   everyTenth
          // );
          // waterline = wl;
          // console.log({ normalizedPoints, yMin, yMax, waterline });
          // const arrayOfCoordinatePairs = normalizedPoints.map(({ x, y }) => [
          //   x * width,
          //   height - y * height
          // ]);
          // setState({ ...state, pointData: [...arrayOfCoordinatePairs] });
        }
      })
      .catch(err => {
        console.error('ERROR', { err });
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="App">
      <MapboxContainer
        getDataOnClick={getDataOnClick}
        submitting={submitting}
      />
    </div>
  );
}
