import React from 'react';
import { StyleSheet,View,Button } from 'react-native';
import { Permissions,Location,MapView,IntentLauncherAndroid } from 'expo';
import { Entypo } from '@expo/vector-icons';

import Loading from '../../screens/loading';

export default class AddLocation extends React.Component{

    constructor(props) {
        super(props);
        const { navigation } = props;
        const location = navigation.getParam('location');
        this.state = {
            loading:true,
            location:location,
            providerStatus:null,
            myLocation:null,
            mylocStatus:false,
        };
    }

    getLocationPermission = async ()=>{
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                permission: 'Permission To Access Location Was Denied',
            });
        }
        let providerStatus = await Location.getProviderStatusAsync();
        this.setState({providerStatus});

        if(!this.state.providerStatus.gpsAvailable || !this.state.providerStatus.locationServicesEnabled){
            await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
        }
        providerStatus = await Location.getProviderStatusAsync();
        this.setState({providerStatus});

        if(this.state.providerStatus.gpsAvailable && this.state.providerStatus.locationServicesEnabled){
            if(this.state.providerStatus.networkAvailable){
                let location = await Location.getCurrentPositionAsync().then(response=>response.coords)
                this.setState({
                    loading:false,
                    myLocation:{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0202,
                        longitudeDelta: 0.0149,
                    },
                    mylocStatus:true,
                    location:{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0202,
                        longitudeDelta: 0.0149,
                    }
                });
            }else{
                alert("Can't Connect to Server !");
                this.setState({
                    loading:false,
                })
            }
        }
        this.setState({loading:false})
    };

    handleLocationChange=(location)=>{
        this.setState({location});
    }

    submitLocation=()=>{
        const { navigation } = this.props;
        const locationHandler = navigation.getParam('locationHandler');
        locationHandler(this.state.location);
        this.props.navigation.navigate('AddPost');
    }

    componentWillMount(){
        this.getLocationPermission();
    }

    render(){
        if (this.state.loading){
            return <Loading/>
        }else{
            return(
                <View style={{ flex: 1 }}>
                    <MapView
                    style={{ flex: 1 }}
                    initialRegion={this.state.location}
                    onRegionChange={this.handleLocationChange}>
                        {this.state.mylocStatus ?
                        <MapView.Marker
                        coordinate={this.state.myLocation}>
                        <View style={styles.mylocation}/>
                        </MapView.Marker>
                        :
                        null}
                    </MapView>
            
                    <View style={styles.button}>
                        <Button title="SUBMIT" color="lightgreen" onPress={this.submitLocation}/>
                    </View>
            
                    <View style={styles.marker}>
                        <Entypo name="location-pin" size={50} color="red"/>
                    </View>
            
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mylocation: {
      height: 20,
      width: 20,
      borderWidth: 3,
      borderColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#007AFF'
    },
    button:{
      position: 'absolute',
      top: '85%',
      alignSelf: 'center'
    },
    marker:{
      position: 'absolute',
      top: '42.3%',
      alignSelf: 'center'
    }
});