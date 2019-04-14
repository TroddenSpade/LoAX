import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { LinearGradient, Constants, Font } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Geohash from "latlon-geohash";

import Home from "../Home/home";
import AddLocation from "./addLocation";
import AddLocSmall from "./addLocSmall";
import AddPicture from "./addPicture";
import { post } from "../../../redux/action/post";

import { OpenCage, OpenCageAPI } from "../../../utils/links";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height - 65;

class AddPost extends React.Component {
  state = {
    image: null,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0202,
      longitudeDelta: 0.0149
    },
    caption: false,
    loading: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("../../../../assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  locationHandler = location => {
    this.setState({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta
      }
    });
  };

  imageHandler = image => {
    this.setState({ image });
  };

  stringToTag = string => {
    let tags = [];
    let words = string.split(" ");
    const length = words.length;
    for (let i = 0; i < length; i++) {
      if (words[i].length < 2) continue;
      if (words[i][0] == "#") {
        tags.push(
          words[i]
            .substring(1)
            .trim()
            .toLowerCase()
        );
      }
    }
    return tags;
  };

  post = async () => {
    const { navigation } = this.props;
    const successHandler = navigation.getParam("successHandler");
    const errorHandler = navigation.getParam("errorHandler");

    const address = await axios(
      `${OpenCage}?q=${this.state.location.latitude}+${
        this.state.location.longitude
      }&key=${OpenCageAPI}`
    )
      .then(response => response.data.results[0].formatted)
      .catch(e => errorHandler(e.response.data.error));

    const formData = new FormData();
    formData.append("address", address);
    formData.append(
      "geoHash",
      Geohash.encode(
        this.state.location.latitude,
        this.state.location.longitude,
        9
      )
    );
    if (this.state.caption){
      formData.append("caption", this.state.caption);
      var arr = this.stringToTag(this.state.caption);
      for (var i = 0; i < arr.length; i++) {
        formData.append("tags", arr[i]);
      }
    }
    formData.append("region.latitude", this.state.location.latitude);
    formData.append("region.longitude", this.state.location.longitude);
    formData.append("region.latitudeDelta", this.state.location.latitudeDelta);
    formData.append(
      "region.longitudeDelta",
      this.state.location.longitudeDelta
    );
    formData.append("image", {
      uri: this.state.image,
      name: "image",
      type: "image/jpg"
    });
    formData.append("user_data", this.props.userid);

    this.props.post(formData, successHandler, errorHandler);
    this.props.navigation.goBack(null);
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
                Add Post
              </Text>
            ) : null}
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.borderpic}>
          <AddPicture
            height={(height * 2) / 5}
            imageHandler={this.imageHandler}
          />
        </View>

        <KeyboardAvoidingView
          styles={{ width: "100%" }}
          behavior="position"
          enabled
        >
          <LinearGradient
            style={styles.borderCaption}
            colors={["#79CB52", "#225377"]}
            start={[1, 0]}
            end={[0, 0]}
          >
            <TextInput
              multiline={true}
              maxLength={150}
              placeholder="Write A Caption"
              style={styles.caption}
              onChangeText={caption => this.setState({ caption })}
            />
          </LinearGradient>
        </KeyboardAvoidingView>

        <LinearGradient
          style={styles.borderMap}
          colors={["#79CB52", "#225377"]}
          start={[1, 0]}
          end={[0, 0]}
        >
          <TouchableOpacity
            style={styles.map}
            onPress={() =>
              this.props.navigation.navigate("AddLocation", {
                locationHandler: location => this.locationHandler(location),
                location: this.state.location
              })
            }
          >
            <AddLocSmall location={this.state.location} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = store => {
  return {
    userid: store.login.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ post }, dispatch);
};

const AddPostConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);

export default (RootStack = createStackNavigator(
  {
    AddPost: {
      screen: AddPostConnect
    },
    AddLocation: {
      screen: AddLocation
    },
    AddPicture: {
      screen: AddPicture
    },
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "AddPost",
    headerMode: "none"
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 10
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  postButton: {
    borderRadius: 10,
    width: (width * 8) / 10,
    height: 40,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 1,
    elevation: 10
  },
  picture: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10
  },
  map: {
    flex: 1,
    margin: 2
  },
  caption: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    textAlignVertical: "top",
    margin: 2,
    borderRadius: 10
  },
  borderpic: {
    height: (height * 2) / 5,
    width: "100%",
    borderRadius: 10
  },
  borderCaption: {
    height: 100,
    width: (width * 9) / 10,
    borderRadius: 11
  },
  borderMap: {
    height: 200,
    width: "90%",
    borderRadius: 10,
    overflow: "hidden"
  }
});
