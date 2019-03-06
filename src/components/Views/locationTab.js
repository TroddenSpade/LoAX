import React from "react";
import { View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MapView,Permissions,Location,IntentLauncherAndroid } from 'expo';
import Geohash from 'latlon-geohash';

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
        alert("Can't Connect to Server !");
        this.setState({
          loading: false
        });
      }
    }
    this.setState({ loading: false });
  };

  // loFinder=()=>{

  // }
  
  handleLocationChange=(location)=>{
    this.setState({location});
    // this.loFinder(location);
  }

  render() {
    return (
      <View style={{ flex: 1,width:'100%'}}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.location}
          onRegionChange={this.handleLocationChange}>
          {this.props.loading ?
            null
          :
          this.props.posts.map(marker => (
            <MapView.Marker
              coordinate={marker.region}
              title={marker.address}
              description={marker.address}/>
          ))}
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