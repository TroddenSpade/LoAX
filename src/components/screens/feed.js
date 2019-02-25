import React from 'react'
import {
    View 
   ,Text
   ,Image
   ,StyleSheet
   ,Dimensions
   ,TouchableWithoutFeedback
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default Feed =(props)=>{
    return(
        <View>
            <View style={{height: 25}}/>
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

                    <View style={styles.userBar}>
                        <Image
                        style={styles.avatar}
                        source={{uri:props.posts.avatar}}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.username}>{props.posts.username}</Text>
                        </View>
                    </View> 
                </View>
                
                <View style={styles.caption}>
                    <Text style={{fontSize:20}}>{props.posts.disc}</Text>
                </View>
            
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
    catption:{

    }
})