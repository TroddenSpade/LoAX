import React from "react";
import { View, Text,TouchableOpacity,StyleSheet,Image } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DropdownAlert from 'react-native-dropdownalert';
import { MapView,Permissions,Location,IntentLauncherAndroid } from 'expo';
import Geohash from 'latlon-geohash';
import { Entypo } from '@expo/vector-icons';

import { location } from '../../redux/action/location';

class LocationTab extends React.Component {
  state = {
    image: null,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0202,
      longitudeDelta: 0.0149
    },
    disc: "",
    loading: false,
    myLocation: null,
    mylocStatus: false
  };

  componentWillMount(){
    this.getLocationPermission();
    const hash = Geohash.encode(this.state.location.latitude,this.state.location.longitude,9);
    this.props.location(hash);
  }

  getLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status)
    if (status !== "granted") {
      this.setState({
        permission: "Permission To Access Location Was Denied"
      });
    }
    let providerStatus = await Location.getProviderStatusAsync();
    this.setState({ providerStatus });
    if (
      !this.state.providerStatus.gpsAvailable ||
      !this.state.providerStatus.locationServicesEnabled
    ) {
      await IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    providerStatus = await Location.getProviderStatusAsync();
    this.setState({ providerStatus });

    if (
      this.state.providerStatus.gpsAvailable &&
      this.state.providerStatus.locationServicesEnabled
    ) {
      if (this.state.providerStatus.networkAvailable) {
        let location = await Location.getCurrentPositionAsync().then(
          response => response.coords
        );
        this.setState({
          loading: false,
          myLocation: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0202,
            longitudeDelta: 0.0149
          },
          mylocStatus: true,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0202,
            longitudeDelta: 0.0149
          }
        });
      } else {
        this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${this.state.providerStatus.networkAvailable} `)
        this.setState({
          loading: false
        });
      }
    }
    this.setState({ loading: false });
  };
  
  handleLocationChange=(location)=>{
    // this.loFinder(location);
  }

  list =(data)=>{
    return data.map((item,id) => {
      return(
      <MapView.Marker
      key={id}
      coordinate={item.region}
      title={item.username}
      description={item.address}
      onCalloutPress={()=>this.props.navigation.navigate('Parallax',{data:item})}
      >
        <View style={styles.marker}>
          <View style={{top:'11%'}}>
            <Entypo name="location-pin" size={60} color="red"/>
          </View>
          <View style={styles.imageView}>
            <Image
            style={styles.images}
            source={{uri:item.url}}/>
          </View>
        </View>
      </MapView.Marker>
    )})
  }

  render() {
    return (
      <View style={{ flex: 1,width:'100%',paddingTop:25}}>
        <DropdownAlert defaultContainer={{paddingTop: 20,padding: 5}} ref={ref => this.dropdown = ref} />
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.location}
          onRegionChange={this.handleLocationChange}>
          {this.props.loading ?
            null
          :
          this.list(this.props.posts)
          }
        </MapView>
      </View>
    );
  }
}

mapStateToProps=(state)=>{
  console.log(state);
  return {
    loading:state.location.loading,
    posts:state.location.posts,
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({location},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LocationTab);

const styles = StyleSheet.create({
  info:{
    flexDirection: 'row',
    flex:1,
    height: 40,
    width:140,
    position:'relative'
  },
  marker:{
    alignItems: 'center',
  },
  callout:{
    flex:1,
  },
  images:{
    height:50,
    width:50,
  },
  imageView:{
    position:'absolute',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
  }
});