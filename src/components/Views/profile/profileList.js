import React from 'react';
import {
     View, 
     Image,
     Text,
     TouchableOpacity,
     StyleSheet,
     Dimensions
    ,ImageBackground
 } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width;

export default ProfileList=(props)=>{
    console.log(props.data)
    const list = props.data.map((item,id)=>(
        <View key={id} style={styles.block}>
            <ImageBackground source={{uri:item.url}} style={{width: '100%', height:100}} blurRadius={1}>
            <TouchableOpacity style={styles.inside}>
            <View><Image style={styles.images} source={{uri :item.url}}/></View>
            <View style={{alignItems: "center",justifyContent:'center',backgroundColor: "lightgreen"}}><Text>likes</Text></View>
            <View style={{alignItems: "center",justifyContent:'center',backgroundColor: "lightgreen"}}><Text>location</Text></View>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    ))
    return list;
}

const styles=StyleSheet.create({
    block:{
        height:100,
        borderColor: 'lightgrey',
        borderBottomWidth:1, 
    },
    inside:{
        marginLeft: 2,
        marginRight: 10,
        flexDirection:"row",
        justifyContent: "space-between",
    },
    images:{
        width:100,
        height: 100,
        borderRadius: 10,
        justifyContent: "center"
    },
    profile:{
        width:screenWidth,
        height: 300,
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        flexDirection: 'column',
        padding: 40,
    },
    avatar:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    imagePro:{
        height:100,
        width: 100,
        borderRadius: 50,
        alignItems:'center',

    },
    username:{
        alignItems: 'center',
        paddingTop: 10,

    },
    settings:{
        flexDirection: "row",
        justifyContent:"flex-end",
    
    }
})