import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";

export default class TabBar extends React.Component {
  state = {
    color: 1
  };

  colors = [
    ["#225377", "#225377", "#79CB52"],
    ["#225377", "#79CB52", "#225377"],
    ["#79CB52", "#225377", "#225377"]
  ];
  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={this.colors[this.state.color]}
        start={[1, 0]}
        end={[0, 0]}
      >
        <View style={styles.cover}>
          {this.props.navigation.state.routes.map((route, routeIndex) => {
            const isRouteActive =
              routeIndex === this.props.navigation.state.index;
            const tintColor = isRouteActive
              ? this.props.activeTintColor
              : this.props.inactiveTintColor;
            return (
              <TouchableOpacity
                key={routeIndex}
                onPress={() => {
                  this.setState({ color: routeIndex });
                  this.props.onTabPress({ route });
                }}
              >
                {this.props.renderIcon({
                  route,
                  focused: isRouteActive,
                  tintColor
                })}
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    justifyContent: "flex-end"
  },
  cover: {
    backgroundColor: "white",
    height: 38,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
