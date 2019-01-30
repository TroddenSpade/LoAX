import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Entypo,SimpleLineIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';

import Fav from './fav';
import Home from './home';
import Profile from './profile';
import Location from './location';
import Like from './like';


export default TabNavigation = createAppContainer(createBottomTabNavigator({
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
