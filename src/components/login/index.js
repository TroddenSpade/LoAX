import React from "react";
import { createStackNavigator } from "react-navigation";

import Signin from "./signin";
import Signup from "./signup";

export const Login = createStackNavigator(
  {
    signIn: {
      screen: Signin,
      navigationOptions: {
        title: "Sign In"
      }
    },
    signUp: {
      screen: Signup,
      navigationOptions: {
        title: "SIGN UP"
      }
    }
  },
  {
    initialRouteName: "signIn",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
