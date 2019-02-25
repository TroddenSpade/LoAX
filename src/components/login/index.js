import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import Signin from './signin';
import Signup from './signup';

export const Login = createStackNavigator(
  {
    signIn:{
      screen:Signin,
      navigationOptions:{
        // title: 'Sign In',
        headerStyle: {
          backgroundColor: "transparent",
        },
      },
    },
    signUp:{
      screen: Signup,
      navigationOptions:{
        title: 'SIGN UP',
        headerStyle: {
          // backgroundColor: "transparent",
        },
      },
    },
  },
  {
    initialRouteName: 'signIn',
  }
);