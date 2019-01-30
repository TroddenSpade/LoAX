import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import Signin from './signin';
import Signup from './signup';

const RootStack = createStackNavigator(
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

const AppContainer = createAppContainer(RootStack);

export default class Login extends React.Component {
  render() {
    return <AppContainer />;
  }
}
