/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import update from 'immutability-helper';
import styled from 'styled-components';
import Markers from './Markers';
import { pushPinAction, setPinsAction } from '../store/actions';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const StyledMap = styled.div`
  transition: all 1.5s ease-in-out;
  /* transition: transform 300ms ease-in-out; */
`;

const MapboxContainer = ({ mapHeight, pins, hasPins, actions }) => {
  const { pushPin, setPins } = actions;
  // const [loaded, setLoaded] = useState(false);
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

    setViewport({
      ...nextViewport,
      width: '100vw',
    });
  };

  const linestringGeoJSON = { type: 'LineString', coordinates: [...pins] };
  return (
    <StyledMap>
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={onViewportChange}
        // onLoad={() => setLoaded(true)}
        onClick={e => onMapClick(e)}
        // eslint-disable-next-line react/jsx-props-no-spreading
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
    </StyledMap>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      pushPin: pin => dispatch(pushPinAction(pin)),
      setPins: pins => dispatch(setPinsAction(pins)),
    },
  };
};

const mapStateToProps = state => {
  return {
    submitting: state.submitting,
    hasPins: state.pins.length > 0,
    pins: state.pins,
    // mapHeight: state.mapHeight,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapboxContainer);
