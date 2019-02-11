import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

export default LocationComponent = (props) =>{
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={props.location}>
      <MapView.Marker
        coordinate={props.location}/>
    </MapView>
  );
}