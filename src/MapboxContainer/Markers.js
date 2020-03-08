import React from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin';

const commonProps = {
  offsetTop: -20,
  offsetLeft: -10,
  draggable: true,
};
const Markers = ({ pins, onMarkerDragEnd }) => {
  return pins.map(([lng, lat], idx) => (
    <Marker
      longitude={lng}
      latitude={lat}
      key={`${lng},${lat}`}
      title={`${lng},${lat}`}
      onDragEnd={e => onMarkerDragEnd(e, idx)}
      {...commonProps}
    >
      <Pin size={20} fill="#D00000CC" />
      {/* {idx} */}
    </Marker>
  ));
};

export default Markers;
