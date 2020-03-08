/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import { ticks } from 'd3-array';
import { scaleDiverging } from 'd3-scale';
import { interpolateRdYlBu } from 'd3-scale-chromatic';
import update from 'immutability-helper';
import styled from 'styled-components';
import Markers from './Markers';
import { pushPinAction, setPinsAction } from '../store/actions/mapActions';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const mapStyle = 'mapbox://styles/pgres54268/cjuiu9aay60dx1fp784rt3x7r';

const StyledMap = styled.div`
  transition: all 1.5s ease-in-out;
  /* transition: transform 300ms ease-in-out; */
`;

export const colorRamp = stop => {
  const color = scaleDiverging(t => interpolateRdYlBu(1 - t)).domain([
    0,
    0.5,
    1,
  ]);
  return color(stop);
};

const generatePaint = () => {
  const colorStops = [];
  ticks(0, 1, 10).forEach(t => {
    colorStops.push(t);
    colorStops.push(colorRamp(t));
  });
  const paint = {
    'line-color': '#ff0000',
    'line-width': 2,
    'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      ...colorStops,
    ],
  };

  return paint;
};

const MapboxContainer = ({ mapHeight, pins, actions }) => {
  const hasPins = pins.length > 0;
  const { pushPin, setPins } = actions;
  const [viewport, setViewport] = useState({
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    longitude: -119,
    latitude: 36,
    zoom: 5,
  });

  const paint = useMemo(() => generatePaint(), []);

  useEffect(() => {
    setViewport(oldViewport => ({ ...oldViewport, height: mapHeight }));
  }, [mapHeight, pins]);

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
        onClick={e => onMapClick(e)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
      >
        {hasPins && (
          <div id="pin-markers">
            <Markers pins={pins} onMarkerDragEnd={onMarkerDragEnd} />
            <Source
              id="my-lines"
              type="geojson"
              data={linestringGeoJSON}
              lineMetrics
            >
              <Layer id="lines" type="line" paint={{ ...paint }} />
            </Source>
          </div>
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
    submitting: state.chart.submitting,
    pins: state.map.pins,
    // mapHeight: state.mapHeight,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapboxContainer);
