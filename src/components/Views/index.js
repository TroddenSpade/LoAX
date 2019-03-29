import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Entypo, AntDesign } from "@expo/vector-icons";

import TabBar from "../screens/tabBar";
import Home from "./Home/home";
import ProfileTab from "./profile/profileTab";
import LocationTab from "./locationTab";

import Parallax from "../Views/Parallax/parallax";
import Profile from "../screens/profile";
import AddPost from "./AddPost/index";
import Search from "./search/search";
import Settings from "./Settings/settings";

const TabNavigation = createAppContainer(
  createBottomTabNavigator(
    {
      location: {
        screen: LocationTab,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Entypo name="location" color={tintColor} size={25} />
          )
        })
      },

      home: {
        screen: Home,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <AntDesign name="home" color={tintColor} size={30} />
          )
        })
      },

      profile: {
        screen: ProfileTab,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <AntDesign name="user" color={tintColor} size={30} />
          )
        })
      }
    },
    {
      initialRouteName: "home",
      tabBarOptions: {
        showLabel: false,
        activeTintColor: "#79CB52",
        inactiveTintColor: "#225377"
      },
      tabBarComponent: props => <TabBar {...props} />
    }
  )
);

export const Views = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation
    },
    Parallax: {
      screen: Parallax
    },
    Profile: {
      screen: Profile
    },
    AddPost: {
      screen: AddPost
    },
    Search: {
      screen: Search
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "TabNavigation",
    headerMode: "none"
  }
);
