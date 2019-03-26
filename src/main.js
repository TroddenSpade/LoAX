import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { Login } from "./components/login";
import { Views } from "./components/Views";

import Loading from "./components/screens/loading";
import { getTokens } from "./utils/misc";
import { checkToken } from "./redux/action/login";

class Main extends React.Component {
  state = {
    login: null
  };

  componentWillMount() {
    getTokens(
      value => {
        if (value[0][1] == null){
            this.props.navigation.navigate("Login");
        }else {
          this.props.checkToken(value);
        }
      },
      err => {
        console.log(err)
        this.props.navigation.navigate("Login");
      }
    );
  }

  componentWillReceiveProps(props) {
    if (props.valid) {
      this.props.navigation.navigate("Views");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return <Loading />;
  }
}

const mapStateToProps = store => {
  return {
    valid: store.login.valid
  };
};

const mapDispatchToProsp = dispatch => {
  return bindActionCreators({ checkToken }, dispatch);
};

const ConnectMainToRedux = connect(
  mapStateToProps,
  mapDispatchToProsp
)(Main);

const RootNavigation = createSwitchNavigator(
  {
    Main: {
      screen: ConnectMainToRedux
    },
    Views: {
      screen: Views
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Main"
  }
);

export default (AppContainer = createAppContainer(RootNavigation));
