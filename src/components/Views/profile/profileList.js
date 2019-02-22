import React from 'react';
import {
    View, 
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    ImageBackground
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default ProfileList=(props)=>{
    return(
        <View style={styles.block}>
            <ImageBackground source={{uri:props.data.url}} style={{width: '100%', height:100}} blurRadius={1}>
            <TouchableOpacity style={styles.inside}>
            <View><Image style={styles.images} source={{uri :props.data.url}}/></View>
            <View style={{alignItems: "center",justifyContent:'center',backgroundColor: "lightgreen"}}><Text>likes</Text></View>
            <View style={{alignItems: "center",justifyContent:'center',backgroundColor: "lightgreen"}}><Text>location</Text></View>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
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