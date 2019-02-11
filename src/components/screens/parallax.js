import React from 'react'
import { View,Text } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import LocationComponent from '../screens/locationComponent';
import Feed from '../screens/feed';

export default class Parallax extends React.Component{
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        console.log("data")
        console.log(data);
        return(
            <ParallaxScrollView
            backgroundColor="white"
            contentBackgroundColor="white"
            parallaxHeaderHeight={700}
            renderForeground={() => (
                <LocationComponent location={data.region}/>
            )}>
                <Feed posts={data}/>
            </ParallaxScrollView>
        )
    }
}