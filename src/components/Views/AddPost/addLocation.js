import React from 'react';
import { Permissions,Location,MapView,IntentLauncherAndroid } from 'expo';

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
            IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
        }
        providerStatus = await Location.getProviderStatusAsync();
        this.setState({providerStatus});

        if(this.state.providerStatus.gpsAvailable && this.state.providerStatus.locationServicesEnabled){
            if(this.state.providerStatus.networkAvailable){
                let location = await Location.getCurrentPositionAsync().then(response=>response.coords)
                this.setState({
                    loading:false,
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
    }

    componentWillMount(){
        this.getLocationPermission();

    }

    render(){
        if (this.state.loading){
            return <Loading/>
        }else{
            return(
                <MapView
                style={{ flex: 1 }}
                region={this.state.location}
                onRegionChangeComplete={this.handleLocationChange}>
                    <MapView.Marker
                    title="Click Me"
                    coordinate={this.state.location}
                    onCalloutPress={this.submitLocation}
                    />
                </MapView>
            )
        }
    };
}