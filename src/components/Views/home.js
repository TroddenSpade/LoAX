import React from "react";
import { 
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView, } from "react-native";

import PostsList from '../logic/postsList'

export default class Home extends React.Component {
  render() {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.topBar}>
        <View><Text style={styles.logoText}>
        L<Image style={styles.logo} source={require('../../utils/LoAX.png')}/>AX
        </Text></View>
      </View>

      <PostsList/>

    </View>
    );
  }
}

const styles =StyleSheet.create({
  logo:{
    width:30,
    height: 30,
  },
  logoText:{
    fontSize:40,
    color: "green"
  },
  topBar:{
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    width:"100%",
    borderBottomWidth:2,
    borderBottomColor:'lightgreen',
    marginTop: 20,
  }
})