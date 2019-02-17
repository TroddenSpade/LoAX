import React from 'react';
import { View,Text } from 'react-native';
import { Permissions,Location,MapView } from 'expo';

import Loading from '../../screens/loading';

export default class AddLocation extends React.Component{
    state={
        location:{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        isMyLocation:false,
        permission:null,
    };

    getLocationPermission = async ()=>{
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status)
        if (status !== 'granted') {
            this.setState({
                permission: 'Permission To Access Location Was Denied',
            });
        }
        let location = await Location.getCurrentPositionAsync().then(response=>response.coords)
        this.setState({
            isMyLocation:true,
            location:{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
        } });
        
    };

    handleLocationChange=(location)=>{
        this.setState({location});
        this.props.locationHandler(location);
    }

    componentWillMount(){
        this.getLocationPermission();
    }

    render(){
        if (this.state.isMyLocation){
            return(
                <MapView
                style={{ flex: 1 }}
                region={this.state.location}
                onRegionChange={this.handleLocationChange}>
                    <MapView.Marker
                    coordinate={this.state.location}/>
                </MapView>
            )
        }else{
            return <Loading/>
        }
        
    };
}