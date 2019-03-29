import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Permissions, ImagePicker } from "expo";

export default class AddPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      image: null,
      cancelled: true
    };
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
      this.props.imageHandler(response.uri);
    }
  };

  useGallery = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    console.log(response);

    if (response.cancelled == false) {
      this.setState({
        cancelled: response.cancelled,
        image: response.uri
      });
      this.props.imageHandler(response.uri);
    }
  };

  render() {
    if (this.state.cancelled) {
      return (
        <View style={styles.container}>
          <View>
            <Button
              onPress={this.useCamera}
              title="take a photo"
              color="#225377"
            />
          </View>

          <View>
            <Button
              onPress={this.useGallery}
              title="Choose from Gallery"
              color="#79CB52"
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ padding: 5 }}>
            <Button
              onPress={this.useCamera}
              title="Camera"
              color="lightgreen"
            />
          </View>

          <View>
            <Image
              style={{
                height: this.state.height,
                width: this.state.height,
                borderRadius: 10
              }}
              source={{ uri: this.state.image }}
            />
          </View>

          <View style={{ padding: 5 }}>
            <Button
              onPress={this.useGallery}
              title="Gallery"
              color="lightgreen"
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
