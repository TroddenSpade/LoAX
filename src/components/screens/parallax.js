import React from 'react'
import { View,Text,Dimensions } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import LocationComponent from './locationComponent';
import Feed from './feed';

var height = Dimensions.get('window').height;

export default class Parallax extends React.Component{
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        
        return(
            <ParallaxScrollView
            backgroundColor="white"
            contentBackgroundColor="white"
            parallaxHeaderHeight={height - 65}
            renderForeground={() => (
                <LocationComponent location={data.region}/>
            )}>
                <Feed posts={data}/>
            </ParallaxScrollView>
        )
    }
}