import React from 'react';
import { createBottomTabNavigator, createAppContainer,createStackNavigator } from 'react-navigation';
import {Entypo,SimpleLineIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';

import Fav from './fav';
import Home from './Home/home';
import Profile from './profile';
import Location from './location';
import Like from './like';

import Parallax from '../logic/parallax'

TabNavigation = createAppContainer(createBottomTabNavigator({
  location: {
    screen:Location,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Entypo
              name="location"
              color={tintColor}
              size={30}
          />
      )
    })
  },

  like :{
    screen:Like,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <SimpleLineIcons
              name="like"
              color={tintColor}
              size={33}/>
      )
    })
  },

  home:{
    screen:Home,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <AntDesign
              name="home"
              color={tintColor}
              size={40}
          />
      )
    })
  },

  fav :{
    screen:Fav,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <MaterialIcons
              name="favorite-border"
              color={tintColor}
              size={40}
          />
      )
    })
  },

  profile :{
    screen:Profile,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <AntDesign
              name="user"
              color={tintColor}
              size={35}
          />
      )
    })
  },
},
{
  initialRouteName : "home",
  tabBarOptions:{
    showLabel: false,
    activeTintColor: "lightgreen",
    style:{
      borderTopWidth: 3,
      borderTopColor: "lightgreen",
      height:60, 
    }
  }

}));



const RootStack = createStackNavigator(
  {
    Main:{
      screen:TabNavigation,
    },
    Parallax:{
      screen: Parallax,
    }
  },
  {
    initialRouteName: 'Main',
    headerMode:'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Navigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}
