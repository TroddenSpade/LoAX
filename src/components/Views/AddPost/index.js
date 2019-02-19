import React from 'react';
import { 
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView } from 'react-native';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import uuid from 'uuid';

import AddLocation from './addLocation';
import AddLocSmall from './addLocSmall';
import AddPicture from './addPicture';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height - 65;

class AddPost extends React.Component{
  state={
    image:null,
    location:{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0202,
      longitudeDelta: 0.0149,
    },
    disc:null,
  }

  locationHandler=(location)=>{
    this.setState({
      location:{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      }
    });
  }

  imageHandler=(image)=>{
    this.setState({image})
  }

  async uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

  uploadImage = async(uri) => {
    uploadUrl = await this.uploadImageAsync(uri);
  }

  render(){
    console.log(this.state)
    return(
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
          onPress={()=>this.uploadImage(this.state.image)}
          title="Post"
          color="lightgreen"/>
        </View> 
        
        <AddPicture height={height*2/5} imageHandler={this.imageHandler}/>
        
        <KeyboardAvoidingView styles={{width:'100%'}} behavior="padding" enabled>
        <TextInput
        multiline={true}
        maxLength={150}
        placeholder="Write A Caption"
        style={styles.caption}
        onChangeText={(disc) => this.setState({disc})}
        value={this.state.text}/>
        </KeyboardAvoidingView>
        

        <TouchableOpacity style={styles.map} 
        onPress={()=>this.props.navigation.navigate('AddLocation',
        {locationHandler:(location)=>this.locationHandler(location)
        ,location:this.state.location})}>
          <AddLocSmall location={this.state.location}/>
        </TouchableOpacity>
      </View>
    )
  }
}

RootStack = createStackNavigator(
  {
    AddPost:{
      screen:AddPost,
    },
    AddLocation:{
      screen: AddLocation,
    },
    AddPicture:{
      screen : AddPicture,
    }
  },
  {
    initialRouteName: 'AddPost',
    headerMode:'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Index extends React.Component{
  render(){
    return (
      <AppContainer/>
    )
  }
  
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button:{
    marginTop:25,
    width: width,
    height: 40,
  },
  picture:{
    height:height*2/5,
    width:width,
  },
  map:{
    height:height*2/5,
    width:width
  },
  caption:{
    height: height/5,
    width:width,
    padding: 5,
    textAlignVertical:"top",
    borderColor: "lightgreen",
    borderWidth:1
  }
})