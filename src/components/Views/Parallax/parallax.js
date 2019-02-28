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
            parallaxHeaderHeight={height - 70}
            renderForeground={() => (
                <LocationComponent location={data.region}/>
            )}>
                <Feed posts={data}
                profileHandler={()=>this.props.navigation.navigate('Profile',{data:data.userid})}
                tagHandler={(tag)=>this.props.navigation.navigate('Search',{tag:tag})}/>
            </ParallaxScrollView>
        )
    }
}