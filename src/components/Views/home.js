import React from "react";
import { 
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView, } from "react-native";


export default class Home extends React.Component {
  
    render() {
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={styles.topBar}>
            <View>
            <Text style={styles.logoText}>Lo
            {/* <Image 
            style={styles.logo} 
            source={require('../loaxLogo.png')}/> */}
            AX</Text></View>
            </View>

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
    borderBottomColor:'lightgreen'
  }
})