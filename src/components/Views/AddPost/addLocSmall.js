import React from 'react';
import { View,Text } from 'react-native';
import { Permissions,Location,MapView } from 'expo';

import Loading from '../../screens/loading';

export default class AddLocSmall extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };
    }

    getLocationPermission = async ()=>{
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                permission: 'Permission To Access Location Was Denied',
            });
        }
        // let location = await Location.getCurrentPositionAsync().then(response=>response.coords)
        this.setState({
            isMyLocation:true,
            
        });
    };

    submitLocation=()=>{
        const { navigation } = this.props;
        const locationHandler = navigation.getParam('locationHandler');
        locationHandler(this.state.location);
    }

    componentWillMount(){
        this.getLocationPermission();
    }

    render(){

        if (this.state.isMyLocation){
            return(
                <MapView
                style={{ flex: 1 }}
                region={this.props.location}>
                    <MapView.Marker
                    coordinate={this.props.location}
                    />
                </MapView>
            )
        }else{
            return <Loading/>
        }
        
    };
}