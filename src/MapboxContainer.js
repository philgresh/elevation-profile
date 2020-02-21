import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
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

// const DRC_MAP = {
//   longitude: 180,
//   latitude: -14,
//   zoom: 5,
//   transitionDuration: 500,
//   transitionInterpolator: new FlyToInterpolator(),
//   transitionEasing: t => t * (2 - t),
// };

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const Markers = React.memo(({ points }) =>
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
);

// classes are so 2018 - use functional components instead!
export default function MapboxContainer() {
  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState(INITIAL_STATE);
  const [points, setPoints] = useState([]);

  // useEffect(() => {
  //   if (loaded) {
  //     setViewport(oldViewport => ({
  //       ...oldViewport,
  //       ...DRC_MAP,
  //     }));
  //   }
  // }, [loaded, DRC_MAP]);

  const onClick = e => {
    e.preventDefault();
    const [lng, lat] = e.lngLat;
    // console.log(e.lngLat);
    setPoints(oldPoints => [...oldPoints, [lng, lat]]);
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyle}
      onViewportChange={nextViewport =>
        setViewport({ ...viewport, ...nextViewport })
      }
      onLoad={() => setLoaded(true)}
      onClick={e => onClick(e)}
      {...viewport}
    >
      {<Markers points={points} />}
    </ReactMapGL>
  );
}
