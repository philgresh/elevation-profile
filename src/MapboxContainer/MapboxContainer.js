import React, { useState, useMemo, useCallback, PureComponent } from 'react';
import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import styled from 'styled-components';
import update from 'immutability-helper';
import Markers from './Markers';
import { ClearPointsButton, GetElevationProfileButton } from './Buttons';
import { replotPointsNearAntimeridian } from '../functions';
import 'mapbox-gl/dist/mapbox-gl.css';

const StyledButtons = styled.div`
  display: flex;
  position: fixed;
  flex-wrap: wrap;
  z-index: 5;
`;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const MapboxContainer = ({ getDataOnClick, submitting, height = '100vh' }) => {
  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    height,
    width: '100vw',
    position: 'absolute',
    longitude: -133,
    latitude: 37,
    zoom: 5,
  });
  const [points, setPoints] = useState([]);

  const onMapClick = e => {
    e.preventDefault();
    const [lng, lat] = e.lngLat;
    // console.log(e.lngLat);
    setPoints(oldPoints => [...oldPoints, [lng, lat]]);
  };

  const getElevationDataOnClick = e => {
    e.preventDefault();
    getDataOnClick(points);
  };

  const clearPointsOnClick = e => {
    e.preventDefault();
    setPoints([]);
    setViewport(oldVP => ({
      ...oldVP,
      height: '100vh',
    }));
  };

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
      // TODO:
      // We are moving across the antimeridian and need to
      //   re-plot any points near it
      // const newPoints = replotPointsNearAntimeridian(points);
      // console.log(points, newPoints);
      // setPoints(newPoints);
    }
    const newViewport = update(viewport, { $merge: { ...nextViewport } });
    setViewport(newViewport);
  };

  const linestringGeoJSON = { type: 'LineString', coordinates: [...points] };
  const hasPoints = points.length > 0 || false;
  return (
    <div>
      <StyledButtons>
        <GetElevationProfileButton
          getElevationDataOnClick={getElevationDataOnClick}
          submitting={submitting}
          disabled={!hasPoints || submitting}
        />
        {hasPoints && (
          <ClearPointsButton
            clearPointsOnClick={clearPointsOnClick}
            disabled={!hasPoints || submitting}
          />
        )}
      </StyledButtons>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={onViewportChange}
        onLoad={() => setLoaded(true)}
        onClick={e => onMapClick(e)}
        {...viewport}
        height={height}
      >
        {/* {<Markers points={points} />} */}
        {hasPoints && (
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
    </div>
  );
};

export default MapboxContainer;
