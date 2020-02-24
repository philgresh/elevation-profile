import React, { useState, useMemo, useCallback, PureComponent } from 'react';
import { connect, useSelector } from 'react-redux';
import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import styled from 'styled-components';
import update from 'immutability-helper';
import Markers from './Markers';
import { pushPin, setPins } from '../store/actions';
import { replotPinsNearAntimeridian } from '../functions';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const MapboxContainer = ({ mapHeight = '100vh', pins, pushPin, setPins }) => {
  const [loaded, setLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    height: mapHeight,
    width: '100vw',
    position: 'absolute',
    longitude: -133,
    latitude: 37,
    zoom: 5,
  });

  const onMapClick = e => {
    e.preventDefault();
    pushPin(e.lngLat);
  };

  const onMarkerDragEnd = (e, index) => {
    e.preventDefault();
    console.log(e.lngLat, index);
    const newPins = update(pins, {
      [index]: { $set: [...e.lngLat] },
    });
    setPins(newPins);
  };

  const onViewportChange = nextViewport => {
    if (viewport.longitude * nextViewport.longitude < 0) {
      // TODO:
      // We are moving across the antimeridian and need to
      //   re-plot any pins near it
      // const newPins = replotPinsNearAntimeridian(pins);
      // console.log(pins, newPins);
      // setPins(newPins);
    }
    const newViewport = update(viewport, { $merge: { ...nextViewport } });
    setViewport(newViewport);
  };

  const linestringGeoJSON = { type: 'LineString', coordinates: [...pins] };
  const hasPins = pins.length > 0 || false;
  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={onViewportChange}
        onLoad={() => setLoaded(true)}
        onClick={e => onMapClick(e)}
        {...viewport}
        height={mapHeight}
      >
        {hasPins && (
          <>
            <Markers pins={pins} onMarkerDragEnd={onMarkerDragEnd} />
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

const mapDispatchToProps = dispatch => {
  return {
    pushPin: pin => dispatch(pushPin(pin)),
    setPins: pins => dispatch(setPins(pins)),
  };
};

const mapStateToProps = state => {
  return {
    submitting: state.submitting,
    hasPins: state.pins.length > 0,
    pins: state.pins,
    mapHeight: state.mapHeight,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapboxContainer);
