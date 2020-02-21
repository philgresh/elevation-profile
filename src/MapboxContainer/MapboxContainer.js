import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactMapGL, {
  Source,
  FlyToInterpolator,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { isEqual } from 'lodash';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';

// this is what state gets initialised as
const INITIAL_STATE = {
  height: 'calc(100vh - 80px)',
  width: '100%',
  position: 'absolute',
  longitude: 180,
  latitude: -14,
  zoom: 5,
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const Markers = React.memo(
  ({ points }) =>
    points.map(([lng, lat], idx) => (
      <Marker
        longitude={lng}
        latitude={lat}
        offsetTop={-20}
        offsetLeft={-10}
        key={`${lng},${lat}`}
        title={`${lng},${lat}`}
        // draggable
        // onDragStart={this._onMarkerDragStart}
        // onDrag={this._onMarkerDrag}
        // onDragEnd={this._onMarkerDragEnd}
      >
        <Pin size={20} />
      </Marker>
    )),
  isEqual,
);

const MapboxContainer = ({ getDataOnClick, submitting }) => {
  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState(INITIAL_STATE);
  const [points, setPoints] = useState([]);

  const onMapClick = e => {
    e.preventDefault();
    const [lng, lat] = e.lngLat;
    // console.log(e.lngLat);
    setPoints(oldPoints => [...oldPoints, [lng, lat]]);
  };

  const onButtonClick = e => {
    e.preventDefault();
    getDataOnClick(points);
  };

  const geojsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: [...points] },
      },
    ],
  };
  console.log(geojsonData);

  return (
    <ReactMapGL
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyle}
      onViewportChange={nextViewport =>
        setViewport({ ...viewport, ...nextViewport })
      }
      onLoad={() => setLoaded(true)}
      onClick={e => onMapClick(e)}
      {...viewport}
    >
      {/* {<Markers points={points} />} */}
      {points.length > 0 && (
        <Source id="my-data" type="geojson" data={geojsonData}></Source>
      )}
      <div style={{ position: 'absolute', right: 0 }}>
        <NavigationControl />
        <button
          onClick={onButtonClick}
          disabled={points.length < 2 || submitting}
        >
          Get my elevation profile!
        </button>
      </div>
    </ReactMapGL>
  );
};

export default MapboxContainer;
