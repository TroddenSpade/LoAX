import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient, Font } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DropdownAlert from "react-native-dropdownalert";

import { registerUser } from "../../redux/action/login";
import { uiAvatar } from "../../utils/links";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("../../../assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  changeUserHandler = username => {
    this.setState({
      username
    });
  };

  changeEmailHandler = email => {
    this.setState({
      email
    });
  };

  changePassHandler = password => {
    this.setState({
      password
    });
  };

  changeConfirmHandler = confirmPassword => {
    this.setState({
      confirmPassword
    });
  };

  signup = () => {
    const { navigation } = this.props;
    const successHandler = navigation.getParam("successHandler");

    if (this.state.email.length == 0) {
      this.dropdown.alertWithType("error", "Enter an Email", "Try Again !");
    } else if (this.state.username.length == 0) {
      this.dropdown.alertWithType("error", "Enter Username", "Try Again !");
    } else if (this.state.password.length == 0) {
      this.dropdown.alertWithType("error", "Enter Password", "Try Again !");
    } else {
      if (this.state.password != this.state.confirmPassword) {
        this.dropdown.alertWithType(
          "error",
          "Password does not Match",
          "Try Again !"
        );
      } else {
        if (this.state.password.length < 6 || this.state.password.length > 20) {
          this.dropdown.alertWithType(
            "error",
            "Error !",
            `Password must contain between 6 and 20 characters.`
          );
        } else {
          const data = {
            email: this.state.email.trim().toLowerCase(),
            password: this.state.password,
            username: this.state.username.trim().toLowerCase(),
            avatar: `${uiAvatar}${this.state.username}`,
            bio: ""
          };
          this.props
            .registerUser(data)
            .then(() => {
              successHandler();
              this.props.navigation.navigate("signIn");
            })
            .catch(e => {
              this.dropdown.alertWithType("error", "Error !", e);
            });
        }
      }
    }
  };

  render() {
    return (
      <LinearGradient
        colors={["#79CB52", "#225377"]}
        style={styles.container}
        start={[0, 0]}
        end={[0, 1]}
      >
        <DropdownAlert
          defaultContainer={{ paddingTop: 20, padding: 5 }}
          ref={ref => (this.dropdown = ref)}
        />
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="username"
              onChangeText={this.changeUserHandler}
            />
          </View>

          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={this.changeEmailHandler}
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

          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={this.changeConfirmHandler}
              secureTextEntry
            />
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: "white", width: 300, height: 50 }
          ]}
          onPress={this.signup}
        >
          {this.state.fontLoaded ? (
            <Text
              style={{
                fontFamily: "Lobster",
                fontSize: 30,
                color: "#225377"
              }}
            >
              Sign Up
            </Text>
          ) : null}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.login.newUser
  };
};

const mapDispatchToProsp = dispatch => {
  return bindActionCreators({ registerUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProsp
)(Signup);

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
  button: {
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
    marginBottom: 10,
    marginTop: 20
  }
});
