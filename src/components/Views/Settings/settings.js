import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Permissions,
  ImagePicker,
  LinearGradient,
  Constants,
  Font
} from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateUser } from "../../../redux/action/login";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Settings extends React.Component {
  state = {
    name: this.props.myData.name,
    bio: this.props.myData.bio,
    lastAvatar: this.props.myData.avatar,
    image: null
  };

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("../../../../assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  useCamera = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    response = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (response.cancelled == false) {
      this.setState({
        cancelled: response.cancelled,
        image: response.uri
      });
    }
  };

  useGallery = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (response.cancelled == false) {
      this.setState({
        cancelled: response.cancelled,
        image: response.uri
      });
    }
  };

  update = async () => {
    const { navigation } = this.props;
    const successHandler = navigation.getParam("successHandler");
    const errorHandler = navigation.getParam("errorHandler");
    let changes = 0;
    const formData = new FormData();
    if (this.state.name !== this.props.myData.name) {
      formData.append("name", this.state.name);
      changes++;
    }
    if (this.state.bio !== this.props.myData.bio) {
      formData.append("bio", this.state.bio);
      changes++;
    }
    if (this.state.image != null) {
      formData.append("image", {
        uri: this.state.image,
        name: "image",
        type: "image/jpg"
      });
      changes++;
    }

    if (changes > 0)
      this.props.updateUser(
        formData,
        this.props.myData._id,
        successHandler,
        errorHandler
      );
    else errorHandler("nothing changed");
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.postButton}
          colors={["#79CB52", "#225377"]}
          start={[1, 0]}
          end={[0, 0]}
        >
          <TouchableOpacity style={styles.button} onPress={this.post}>
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "Lobster",
                  fontSize: 25,
                  color: "white"
                }}
              >
                Update Profile
              </Text>
            ) : null}
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.settings}>
          <View>
            <Text>Name :</Text>
            <LinearGradient
              style={styles.nameBorder}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <TextInput
                maxLength={30}
                value={null}
                placeholder={this.props.myData.name}
                style={styles.name}
                onChangeText={name => this.setState({ name })}
              />
            </LinearGradient>
          </View>

          <View>
            <Text>Bio:</Text>
            <LinearGradient
              style={styles.bioBorder}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <TextInput
                multiline={true}
                maxLength={150}
                placeholder={this.props.myData.bio}
                style={styles.bio}
                onChangeText={bio => this.setState({ bio })}
              />
            </LinearGradient>
          </View>

          <View>
            <Text>Profile Photo:</Text>
            <View style={styles.avatar}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <View style={{ margin: 10 }}>
                  <Button
                    title="Gallery"
                    onPress={this.useGallery}
                    color="#225377"
                  />
                </View>
                <LinearGradient
                  style={styles.pic1Border}
                  colors={["#79CB52", "#225377"]}
                  start={[1, 0]}
                  end={[0, 0]}
                >
                  <Image
                    style={styles.pic1}
                    source={{ uri: this.state.lastAvatar }}
                  />
                </LinearGradient>
                <View style={{ margin: 10 }}>
                  <Button
                    title="Camera"
                    onPress={this.useCamera}
                    color="#79CB52"
                  />
                </View>
              </View>
              <LinearGradient
                style={styles.pic2Border}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <Image
                  style={styles.pic2}
                  source={{
                    uri:
                      this.state.image != null
                        ? this.state.image
                        : this.state.lastAvatar
                  }}
                />
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    myData: state.login.user
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 10
  },
  update: {
    width: screenWidth
  },
  settings: {
    height: screenHeight - 65,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  name: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    margin: 2
  },
  nameBorder: {
    width: (screenWidth * 3) / 4,
    height: 35,
    borderRadius: 11
  },
  bio: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    textAlignVertical: "top"
  },
  bioBorder: {
    width: (screenWidth * 3) / 4,
    height: 80,
    borderRadius: 11
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center"
  },
  pic1: {
    flex: 1,
    margin: 1,
    borderRadius: 40
  },
  pic1Border: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5
  },
  pic2: {
    flex: 1,
    margin: 1,
    borderRadius: 100
  },
  pic2Border: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 5
  },
  bioBorder: {
    width: (screenWidth * 3) / 4,
    height: 80,
    borderRadius: 11
  },
  postButton: {
    borderRadius: 10,
    width: (screenWidth * 8) / 10,
    height: 40,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 1,
    elevation: 10
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  }
});
