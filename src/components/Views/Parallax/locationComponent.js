import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { AntDesign } from '@expo/vector-icons';

export default LocationComponent = (props) =>{
  return (
    <View style={styles.container}>
      <MapView
        style={{height:'100%',width:'100%'}}
        initialRegion={props.location}>
        <MapView.Marker
          coordinate={props.location}/>
      </MapView>
      <View style={styles.topBar}>
        <Text style={styles.pullup}>
        <AntDesign name="caretup" size={30} color='white'/>
        PULL UP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topBar:{
    height: 25,
    width: '100%',
    flex: 1,
    backgroundColor: "lightgreen",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
  },
  pullup:{
    color:"white",
    fontSize: 22,
  }
});