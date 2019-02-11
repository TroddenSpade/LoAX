import React from 'react';
import {
     View, 
     Image,
     Text,
     TouchableOpacity,
     StyleSheet,
     Dimensions } from 'react-native';


const screenWidth = Dimensions.get("window").width;

export default ProfileList=(props)=>{
    const list = props.data.map((item)=>{
        return(
            <View key={item.id} style={styles.block}>
                <TouchableOpacity style={styles.inside}>
                <View><Image style={styles.images} source={{uri :item.url}}/></View>
                <View style={{justifyContent:'center'}}><Text>likes</Text></View>
                <View style={{justifyContent:'center'}}><Text>location</Text></View>
                </TouchableOpacity>
            </View>
        )
    })
    return(
        <View>
            <View style={styles.profile}>

            <View style={styles.avatar}>
                <View style={{alignItems:'center'}}>
                <Image style={styles.imagePro} source={{uri :props.user[0].image}}/>
                </View>
                
                <View style={styles.username}>
                <Text style={{fontSize:20,color:'green'}}>{props.user[0].username}</Text>
                </View>
            </View>

            </View>

            <View>{list}</View>
        </View>

    )
}

const styles=StyleSheet.create({
    block:{
        height:90,
        borderColor: 'lightgrey',
        borderBottomWidth:1, 
    },
    inside:{
        marginLeft: 2,
        marginRight: 10,
        flexDirection:"row",
        justifyContent: "space-between"
    },
    images:{
        width:90,
        height: 90,
        borderRadius: 10,
    },
    profile:{
        width:screenWidth,
        height: 300,
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
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

    }
})