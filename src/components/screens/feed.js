import React from 'react'
import {
    View 
   ,Text
   ,Image
   ,StyleSheet
   ,Dimensions
   ,TouchableOpacity} from 'react-native';
import {Entypo,SimpleLineIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export default Feed =(props)=>{
    return(
    <View style={{borderBottomColor: 'lightgrey',borderBottomWidth:1,}}>
        <View style={{flexDirection:'column'}}> 
            <Image 
            style={styles.images}
            source={{uri:props.posts.url}}/>
        </View>

        <View style={styles.profile}>     
            <TouchableOpacity style={styles.profile}>
            <Image 
                style={styles.avatar}
                source={{uri:props.posts.avatar}}/>
            <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize:20,}}>{props.posts.username}</Text>
            </View>
            </TouchableOpacity>

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
        justifyContent: 'center'
    },
    images:{
        width:screenWidth,
        height: screenWidth-30,
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'green',
        margin: 10,
    },
    profile:{
        flexDirection:"row",
        height: 55,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    locationBar:{
        backgroundColor: "green", 
        height: 40,
        justifyContent: 'center'
    },
    catption:{

    }
})