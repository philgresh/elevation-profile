import React, { useState } from 'react';
// import update from "immutability-helper";
import axios from 'axios';
import { transcribePoints, setUpGetPoints, everyTenth, svgPath } from './functions';
import Chart from './Chart';
import Inputs from './Input';
import MapboxContainer from './MapboxContainer';
import './styles.css';

const width = 500;
const height = 200;
const numSamplePoints = 500;
const smoothingFactor = 0.1;
let waterline = -100000;

export default function App() {
  const [state, setState] = useState({
    lat0: -13.644694,
    lon0: -172.3935,
    lat1: -17.89175,
    lon1: 177.667722,
    pointData: []
  });

  const onChangeSetState = ({ target }) => {
    const { name, value } = target;
    let val = value;
    if (typeof value !== 'number') val = Number(value);
    const newState = { ...state, [name]: val };
    setState({ ...newState });
  };

  async function onFormButtonClick(e) {
    e.preventDefault();
    const { lat0, lon0, lat1, lon1 } = state;
    const points = [
      {
        lat: lat0,
        lon: lon0
      },
      {
        lat: lat1,
        lon: lon1
      }
    ];

    const { url, params } = await setUpGetPoints(points, numSamplePoints);
    await axios
      .get(url, { params })
      .then(resp => {
        const {
          data: { status, results }
        } = resp;
        if (status === 'OK') {
          // console.log({ results });
          const { normalizedPoints, yMin, yMax, waterline: wl } = transcribePoints(
            results,
            everyTenth
          );
          waterline = wl;
          console.log({ normalizedPoints, yMin, yMax, waterline });
          const arrayOfCoordinatePairs = normalizedPoints.map(({ x, y }) => [
            x * width,
            height - y * height
          ]);
          setState({ ...state, pointData: [...arrayOfCoordinatePairs] });
        }
      })
      .catch(err => {
        console.error('ERROR', { err });
      });
  }

  const hasPointData = state.pointData.length > 0;
  let path = null;
  if (hasPointData) {
    const pathProps = { fill: 'none', stroke: 'grey', strokeWidth: '3px' };
    path = svgPath(state.pointData, pathProps, smoothingFactor);
  }

  const size = { height, width };

  return (
    <div className="App">
      <Inputs
        state={state}
        onChangeSetState={onChangeSetState}
        onFormButtonClick={onFormButtonClick}
      />
      <MapboxContainer />
      {hasPointData && <Chart size={size} waterline={waterline} path={path} />}
    </div>
  );
}
