import React, { useState, useMemo, useCallback, PureComponent } from 'react';
import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import { isEqual } from 'lodash';
import update from 'immutability-helper';
import Pin from './Pin';
import { replotPointsNearAntimeridian } from '../functions';
import 'mapbox-gl/dist/mapbox-gl.css';

// this is what state gets initialised as
const INITIAL_STATE = {
  height: 'calc(100vh - 80px)',
  width: '100%',
  position: 'absolute',
  longitude: -133,
  latitude: 37,
  zoom: 5,
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

// class Markers extends PureComponent {
//   render() {
//     const { points, onMarkerDragEnd } = this.props;
//     return points.map(([lng, lat], idx) => (
//       <Marker
//         longitude={lng}
//         latitude={lat}
//         offsetTop={-20}
//         offsetLeft={-10}
//         key={`${lng},${lat}`}
//         title={`${lng},${lat}`}
//         draggable
//         // onDragStart={this._onMarkerDragStart}
//         // onDrag={this._onMarkerDrag}
//         onDragEnd={e => onMarkerDragEnd(e, idx)}
//       >
//         <Pin size={20} />
//       </Marker>
//     ));
//   }
// }
const Markers = ({ points, onMarkerDragEnd }) => {
  const commonProps = {
    offsetTop: -20,
    offsetLeft: -10,
    draggable: true,
  };

  return points.map(([lng, lat], idx) => (
    <Marker
      longitude={lng}
      latitude={lat}
      key={`${lng},${lat}`}
      title={`${lng},${lat}`}
      onDragEnd={e => onMarkerDragEnd(e, idx)}
      {...commonProps}
    >
      <Pin size={20} />
    </Marker>
  ));
};
const MapboxContainer = ({ getDataOnClick, submitting }) => {
  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState(INITIAL_STATE);
  const [points, setPoints] = useState([]);

  const onMapClick = useCallback(
    e => {
      e.preventDefault();
      const [lng, lat] = e.lngLat;
      // console.log(e.lngLat);
      setPoints(oldPoints => [...oldPoints, [lng, lat]]);
    },
    [points],
  );

  const getElevationDataOnClick = useCallback(
    e => {
      e.preventDefault();
      getDataOnClick(points);
    },
    [points],
  );

  const clearPointsOnClick = useCallback(
    e => {
      e.preventDefault();
      setPoints([]);
    },
    [points],
  );

  const onMarkerDragEnd = (e, index) => {
    e.preventDefault();
    console.log(e.lngLat, index);
    const newPoints = update(points, {
      [index]: { $set: [...e.lngLat] },
    });
    setPoints(newPoints);
  };

  const onViewportChange = nextViewport => {
    if (viewport.longitude * nextViewport.longitude < 0) {
      // We are moving across the antimeridian and need to
      //   re-plot any points near it
      const newPoints = replotPointsNearAntimeridian(points);
      console.log(points, newPoints);

      setPoints(newPoints);
    }
    const newViewport = update(viewport, { $merge: { ...nextViewport } });
    setViewport(newViewport);
  };
  // const pointsGeoJSON = {
  //   type: 'FeatureCollection',
  //   features: [
  //     ...points.map(point => ({
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [...point],
  //       },
  //     })),
  //   ],
  // };

  const linestringGeoJSON = { type: 'LineString', coordinates: [...points] };

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={onViewportChange}
        onLoad={() => setLoaded(true)}
        onClick={e => onMapClick(e)}
        {...viewport}
      >
        {/* {<Markers points={points} />} */}
        {points.length > 0 && (
          <>
            <Markers points={points} onMarkerDragEnd={onMarkerDragEnd} />
            <Source id="my-lines" type="geojson" data={linestringGeoJSON}>
              <Layer
                id="lines"
                type="line"
                paint={{
                  'line-color': '#ff0000',
                  'line-width': 2,
                }}
              />
            </Source>
          </>
        )}
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
      <button
        onClick={getElevationDataOnClick}
        disabled={points.length === 0 || submitting}
        id="get-elevation-profile-button"
      >
        Get my elevation profile!
      </button>
      <button
        onClick={clearPointsOnClick}
        disabled={points.length === 0 || submitting}
        id="clear-button"
      >
        Clear points
      </button>
    </div>
  );
};

export default MapboxContainer;
