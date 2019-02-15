import React from 'react'
import { View,Text } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import LocationComponent from './locationComponent';
import Feed from './feed';

export default class Parallax extends React.Component{
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        
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