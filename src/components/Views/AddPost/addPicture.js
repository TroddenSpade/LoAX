import React from 'react';
import { View,Text,StyleSheet,Button } from 'react-native';
import { Permissions,ImagePicker } from 'expo';

export default class AddPicture extends React.Component{

    state={
        isPhoto: false,
    }

    useCamera= async ()=>{
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        response = await ImagePicker.launchCameraAsync()
        console.log(response);
    }

    useGallery=()=>{

    }

    render(){
        if(this.state.isPhoto){
            return(
                <View><Text>yess</Text></View>
            )
        }else{
            return(
            <View style={styles.container}>
                <Button
                style={{padding: 5}}
                onPress={this.useCamera}
                title="take a photo"
                color="lightgreen"/>
                
                <Button
                style={{padding: 5}}
                onPress={this.useGallery}
                title="Choose from Gallery"
                color="lightgreen"/>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
});