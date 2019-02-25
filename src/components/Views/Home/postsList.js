import React from 'react';
import {
    View 
   ,Text
   ,Image
   ,StyleSheet
   ,Dimensions
   ,TouchableOpacity
,TouchableWithoutFeedback} from 'react-native';
import {Entypo,AntDesign} from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export default List =(props)=>{
    return(
    <View style={styles.container}>
        <View style={styles.address}>
            <Text>{props.posts.address}</Text>
        </View>
        <View style={{justifyContent: "flex-end",alignItems: "flex-start"}}>
            <TouchableWithoutFeedback
            onLongPress={() => {props.locationHandler()}}
            delayLongPress={1500}>
                <Image 
                style={styles.images}
                source={{uri:props.posts.url}}/>
            </TouchableWithoutFeedback> 

            <TouchableOpacity style={styles.userBar} onPress={()=>{props.profileHandler()}}>
                <Image
                style={styles.avatar}
                source={{uri:props.posts.avatar}}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.username}>{props.posts.username}</Text>
                </View>
            </TouchableOpacity> 
        </View>


        <TouchableOpacity style={styles.locationBar} onPress={() => {props.locationHandler()}}>
            <View style={{flexDirection:'row',alignContent:'center',justifyContent: 'center'}}>
                <Entypo name="location-pin" size={24} color="white"/>
                <Text style={{fontSize:20 ,color:"white"}}>LOCATION</Text>
            </View>
        </TouchableOpacity>
        

        <View style={styles.profile}>

            <View style={{flexDirection:'row',marginRight:10,}}>
            <TouchableOpacity style={{justifyContent:'center',marginRight:15}}>
                <AntDesign name="like2" size={30} color="green" /> 
            </TouchableOpacity>
            
            <TouchableOpacity style={{justifyContent:'center',marginRight:10}}>
                <Entypo name="dots-three-horizontal" size={30} color='green'/>
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.caption}>
            <Text style={{fontSize:20}}>{props.posts.disc}</Text>
        </View>
        
    </View>
    )        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5,
        borderWidth: 1,
        borderColor:"lightgreen",
        borderRadius:20,
    },
    address:{
        height:40,
        padding:5,
    },
    userBar:{
        flex:1,
        position: 'absolute',
        flexDirection: "row",
        backgroundColor: "white",
        padding:5,
        borderTopRightRadius: 20,
    },
    username:{
        color:"grey",
        fontSize: 20,
        marginRight: 5,
        marginLeft: 5
    },
    avatar:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'green',
    },
    images:{
        width:screenWidth-10,
        height:screenWidth-10,
    },
    locationBar:{
        backgroundColor: "lightgreen",
        height: 40,
        width: screenWidth-10,
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    catption:{

    }
})