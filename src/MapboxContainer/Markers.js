import React from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin';

const Markers = ({ pins, onMarkerDragEnd }) => {
  const commonProps = {
    offsetTop: -20,
    offsetLeft: -10,
    draggable: true,
  };

  return pins.map(([lng, lat], idx) => (
    <Marker
      longitude={lng}
      latitude={lat}
      key={`${lng},${lat}`}
      title={`${lng},${lat}`}
      onDragEnd={e => onMarkerDragEnd(e, idx)}
      {...commonProps}
    >
      <Pin size={20} fill={'#D00'} />
    </Marker>
  ));
};

export default Markers;
