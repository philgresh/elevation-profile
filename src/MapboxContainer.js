import React, { useState } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const initialState = {
  lng: -118.4863,
  lat: 37.0922,
  zoom: 10
};

const defaultStyle = 'mapbox://styles/mapbox/streets-v9';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicGdyZXM1NDI2OCIsImEiOiJjazY2dDQ1Y2owa2FrM2xuc2d3MTMzZ2g1In0.5p1KOaTO_mruaUlSoDWxNA'
});

const MapboxContainer = () => {
  const [state, setState] = useState(initialState);

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style={defaultStyle}
      // containerStyle={{
      //   height: "100vh",
      //   width: "100vw"
      // }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[state.lng, state.lat]} />
      </Layer>
    </Map>
  );
};

export default MapboxContainer;
