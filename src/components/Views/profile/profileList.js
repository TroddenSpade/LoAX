import React from 'react';
import {
    View, 
    Image,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default ProfileList=(props)=>{
    return(
        <View style={styles.block}>
            <ImageBackground source={{uri:props.data.url}} style={{width: '100%', height:100}} blurRadius={1}>
                <TouchableOpacity style={styles.inside}
                onPress={props.postHandler}>
                    <View><Image style={styles.images} source={{uri :props.data.url}}/></View>
                    
                    <View style={styles.address}><Text style={styles.text}>{props.data.address}</Text></View>
                    
                    <View style={styles.button}>
                        <Button title="Edit" color="lightgreen" onPress={()=>alert("edit")}/>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles=StyleSheet.create({
    block:{
        height:100,
        borderColor: 'lightgreen',
        borderWidth:1,
        margin:5,
    },
    inside:{
        marginLeft: 2,
        marginRight: 10,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center"
        
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
    
    },
    address:{
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        height:80,
        width: 150,
        borderRadius: 15,
        backgroundColor: "lightgreen",
        
    },
    text:{
        color: "white",
    },
    button:{
        flexDirection:"row",
        height: 100,
    }
})