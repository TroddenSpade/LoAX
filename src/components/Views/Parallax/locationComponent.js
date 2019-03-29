import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MapView, LinearGradient } from "expo";
import { AntDesign } from "@expo/vector-icons";

export default (LocationComponent = props => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", width: "100%" }}
        initialRegion={props.location}
      >
        <MapView.Marker coordinate={props.location} />
      </MapView>
      <LinearGradient
        style={[styles.topBar]}
        colors={["#79CB52", "#225377"]}
        start={[1, 0]}
        end={[0, 0]}
      >
        <AntDesign name="caretup" size={30} color="white" />
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  topBar: {
    height: 25,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute"
  },
  pullup: {
    color: "white",
    fontSize: 22
  }
});
