import React from "react";
import {
  View,
  Text,
  Image,
  CheckBox,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient, Font } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Entypo } from "@expo/vector-icons";
import DropdownAlert from "react-native-dropdownalert";

import { signinUser } from "../../redux/action/login";
import { setTokens } from "../../utils/misc";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    autoSignIn: false,
    fontLoaded: false
  };

  componentWillMount() {
    this.spinValue = new Animated.Value(0);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Sacramento: require("../../../assets/fonts/Sacramento-Regular.ttf"),
      Lobster: require("../../../assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ fontLoaded: true });

    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 5000
    }).start();
  }

  changeUserHandler = email => {
    this.setState({
      email
    });
  };

  changePassHandler = password => {
    this.setState({
      password
    });
  };

  componentWillReceiveProps(props) {
    if (props.login.isAuth) {
      this.props.navigation.navigate("Views");
    }
  }

  signin = () => {
    if (this.state.email.length == 0 || this.state.password.length == 0) {
      this.dropdown.alertWithType(
        "error",
        "Error !",
        `Fill Out Empty Fields !`
      );
    } else {
      const data = {
        email: this.state.email.trim().toLowerCase(),
        password: this.state.password
      };
      this.props
        .signinUser(data)
        .then(response => {
          if (this.state.autoSignIn) {
            console.log(response);
            setTokens(response.payload.user);
          }
        })
        .catch(e =>
          this.dropdown.alertWithType(
            "error",
            "Error !",
            `error has been occurred :( \n${e} `
          )
        );
    }
  };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    const animatedStyle = {
      transform: [{ rotate: spin }]
    };

    return (
      <LinearGradient
        colors={["#79CB52", "#225377"]}
        style={styles.container}
        start={[0, 0]}
        end={[0, 1]}
      >
        <DropdownAlert
          defaultContainer={{ paddingTop: 18, padding: 5 }}
          ref={ref => (this.dropdown = ref)}
        />
        <KeyboardAvoidingView behavior="padding" enabled>
          {this.state.fontLoaded ? (
            <View style={styles.logo}>
              <Text style={styles.logoText}>l</Text>
              <Animated.Image
                style={[styles.image, animatedStyle]}
                source={require("../../../assets/icon.png")}
              />
              <Text style={styles.logoText}>ax</Text>
            </View>
          ) : null}

          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={this.changeUserHandler}
            />
          </View>

          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={this.changePassHandler}
              secureTextEntry
            />
          </View>
        </KeyboardAvoidingView>

        <View style={styles.bottomBar}>
          <View style={styles.checkBox}>
            <CheckBox
              value={this.state.autoSignIn}
              style={{
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 5
              }}
              onValueChange={() =>
                this.setState({ autoSignIn: !this.state.autoSignIn })
              }
            />
            <Text style={{ fontSize: 15, color: "white" }}>Remember Me</Text>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={this.signin}>
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "Lobster",
                  fontSize: 30,
                  color: "#225377"
                }}
              >
                Sign In
              </Text>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signUpButton,
              { borderColor: "white", width: 100, height: 40 }
            ]}
            onPress={() => this.props.navigation.navigate("signUp")}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "Lobster",
                  fontSize: 20,
                  color: "white"
                }}
              >
                Sign Up
              </Text>
            ) : null}
            <Entypo name="chevron-right" color={"white"} size={30} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProsp = dispatch => {
  return bindActionCreators({ signinUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProsp
)(Signin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    paddingLeft: 4,
    width: 300,
    height: 40,
    backgroundColor: "white"
  },
  block: {
    margin: 10
  },
  checkBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 40,
    width: 40,
    marginTop: 15
  },
  logoText: {
    fontSize: 100,
    fontFamily: "Sacramento",
    color: "white"
  },
  bottomBar: {
    flexDirection: "column",
    width: 300,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  text: {
    fontFamily: "Sacramento",
    color: "white"
  },
  signUpButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // borderWidth: 3,
    marginTop: 30
  },
  signInButton: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 1,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    width: 300,
    height: 50,
    marginBottom: 10 ,
    marginTop:20,
  }
});
