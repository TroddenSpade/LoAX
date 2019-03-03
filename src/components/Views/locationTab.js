import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class Location extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>LocationTab is under Construction !</Text>
        <Ionicons name="md-construct" size={100} color='lightgreen'/>
      </View>
    );
  }
}