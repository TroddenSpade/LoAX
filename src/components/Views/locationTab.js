import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import { MapView, Permissions, Location, IntentLauncherAndroid } from "expo";
import Geohash from "latlon-geohash";
import { Entypo } from "@expo/vector-icons";

import { location } from "../../redux/action/location";
import Loading from "../screens/loading";

class LocationTab extends React.Component {
  state = {
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0202,
      longitudeDelta: 0.0149
    },
    disc: "",
    mylocStatus: false,
    mylocLoading: true
  };

  componentWillMount() {
    this.getLocationPermission();
    const hash = Geohash.encode(
      this.state.location.latitude,
      this.state.location.longitude,
      9
    );
    this.props.location(hash);
    setTimeout(() => {
      this.setState({ mylocLoading: false });
      if (!this.state.mylocStatus)
        this.dropdown.alertWithType("error", "Error", "Timeout !");
    }, 10000);
  }

  getLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.dropdown.alertWithType(
        "error",
        "Error",
        "Permission To Access Location Was Denied"
      );
      this.setState({ mylocLoading: false });
    }

    let providerStatus = await Location.getProviderStatusAsync();

    if (
      !providerStatus.gpsAvailable ||
      !providerStatus.locationServicesEnabled
    ) {
      await IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }

    if (!providerStatus.gpsAvailable) {
      this.setState({ mylocLoading: false });
      this.dropdown.alertWithType("error", "Error", "GPS Not Available");
    } else if (!providerStatus.locationServicesEnabled) {
      this.setState({ mylocLoading: false });
      this.dropdown.alertWithType("error", "Error", "locationServicesEnabled");
    } else if (!providerStatus.networkAvailable) {
      this.setState({ mylocLoading: false });
      this.dropdown.alertWithType("error", "Error", "Network Not Available");
    } else if (!providerStatus.passiveAvailable) {
      this.setState({ mylocLoading: false });
      this.dropdown.alertWithType("error", "Error", "Passive Not Available");
    } else {
      let location = await Location.getCurrentPositionAsync().then(
        response => response.coords
      );
      this.setState({
        mylocLoading: false,
        mylocStatus: true,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0202,
          longitudeDelta: 0.0149
        }
      });
    }
  };

  handleLocationChange = location => {
    // this.loFinder(location);
  };

  list = data => {
    return data.map((item, id) => {
      return (
        <MapView.Marker
          key={id}
          coordinate={item.region}
          tooltip={false}
          title={item.username}
          description={item.address}
          onCalloutPress={() =>
            this.props.navigation.navigate("Parallax", { data: item })
          }
        >
          <View style={styles.marker}>
            <View style={{ top: "11%" }}>
              <Entypo name="location-pin" size={60} color="#469577" />
            </View>
            <View style={styles.imageView}>
              <Image style={styles.images} source={{ uri: item.image_url }} />
            </View>
          </View>
          <MapView.Callout style={{width: '200%'}}>
            <Text style={{fontSize:10}}>{item.address}</Text>
          </MapView.Callout>
        </MapView.Marker>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <DropdownAlert
          defaultContainer={{ paddingTop: 20, padding: 5 }}
          ref={ref => (this.dropdown = ref)}
        />
        {this.state.mylocLoading ? (
          <Loading />
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.location}
            onRegionChange={this.handleLocationChange}
          >
            {this.state.mylocStatus ? (
              <MapView.Marker coordinate={this.state.location}>
                <View style={styles.mylocation} />
              </MapView.Marker>
            ) : null}
            {this.props.loading ? null : this.list(this.props.posts)}
          </MapView>
        )}
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    loading: state.location.loading,
    posts: state.location.posts
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators({ location }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationTab);

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    flex: 1,
    height: 40,
    width: 140,
    position: "relative"
  },
  marker: {
    flex:1,
    alignItems: "center"
  },
  callout: {
    flex: 1
  },
  images: {
    height: 50,
    width: 50
  },
  imageView: {
    flexDirection: "row",
    position: "absolute",
    borderWidth: 2,
    borderColor: "#469577",
    borderRadius: 5
  },
  mylocation: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#007AFF"
  }
});
