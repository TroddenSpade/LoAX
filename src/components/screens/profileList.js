import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo";

const screenWidth = Dimensions.get("window").width;

export default (ProfileList = props => {
  return (
    <View style={styles.block}>
      <ImageBackground
        source={{ uri: props.data.image_url }}
        style={{ width: "100%", height: 100 }}
        blurRadius={1}
      >
        <TouchableOpacity style={styles.inside} onPress={props.postHandler}>
          <View>
            <Image
              style={styles.images}
              source={{ uri: props.data.image_url }}
            />
          </View>

          <LinearGradient
            style={styles.address}
            colors={["#61B85E", "#398484"]}
            start={[1, 0]}
            end={[0, 0]}
          >
            <Text style={styles.text}>{props.data.address}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  block: {
    height: 100,
    borderColor: "lightgreen",
    borderWidth: 1,
    margin: 5
  },
  inside: {
    marginLeft: 2,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  images: {
    width: 100,
    height: 100,
    // borderRadius: 10,
    justifyContent: "center"
  },
  profile: {
    width: screenWidth,
    height: 300,
    borderBottomColor: "green",
    borderBottomWidth: 2,
    flexDirection: "column",
    padding: 40
  },
  avatar: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  imagePro: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center"
  },
  username: {
    alignItems: "center",
    paddingTop: 10
  },
  settings: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  address: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    borderRadius: 15,
    backgroundColor: "lightgreen"
  },
  text: {
    color: "white",
    fontSize: 12
  },
  button: {
    flexDirection: "row",
    height: 100
  }
});
