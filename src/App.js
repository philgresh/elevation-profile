import React, { useState, useEffect } from 'react';
// import update from "immutability-helper";
import axios from 'axios';
import { setUpGetPoints } from './functions';
import ChartContainer from './Chart/ChartContainer';
import MapboxContainer from './MapboxContainer/MapboxContainer';
import './styles.css';

const numSamplePoints = 100;
const chartOptions = {
  width: window.innerWidth - 50,
  height: 200,
  smoothingFactor: 0.1,
};
const prepElevData = data =>
  data.results.map((p, index) => ({
    index,
    elevation: p.elevation,
    lat: p.location.lat,
    lng: p.location.lng,
  }));

export default function App() {
  const [submitting, setSubmitting] = useState(false);
  const [elevationData, setElevationData] = useState([]);
  const [mapHeight, setMapHeight] = useState('100vh');

  async function getDataOnClick(points) {
    setSubmitting(true);

    const { url, params } = await setUpGetPoints(points, numSamplePoints);
    const response = await axios
      .get(url, { params })
      .then(({ data }) => {
        console.log(data);
        setElevationData(prepElevData(data));
      })
      .catch(err => {
        // setElevationData(prepElevData(data))
        // console.error('Error fetching elevation data', { err })})
        console.log(err);
      })
      .finally(() => setSubmitting(false));

    console.log(response);
  }

  const hasElevationData = elevationData.length > 0;
  useEffect(() => {
    if (hasElevationData)
      setMapHeight(`${window.innerHeight - chartOptions.height}px`);
    console.log('usecallback', { mapHeight, hasElevationData });
  }, [elevationData]);
  // if (hasElevationData) setMapHeight(window.innerHeight - chartOptions.height);

  return (
    <div className="App">
      <MapboxContainer
        getDataOnClick={getDataOnClick}
        submitting={submitting}
        height={mapHeight}
      />
      {hasElevationData && (
        <ChartContainer
          chartOptions={chartOptions}
          elevationData={elevationData}
        />
      )}
    </div>
  );
}
