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
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid';

import Home from '../Home/home';
import AddLocation from './addLocation';
import AddLocSmall from './addLocSmall';
import AddPicture from './addPicture';

import { OpenCage , FireBase ,OpenCageAPI } from '../../../utils/links';

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
    disc:'',
    loading:false,
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

  stringToTag=(string)=>{
    let tags = {};
    const length = string.length;
    for(let i=0 ; i<length;i++){
      if(string[i]=='#'){
        let tag='';
        i++;
        while(i<length && string[i]!=' '){
          tag +=string[i];
          i++;
        }
        Object.assign(tags,{[tag]:true});
      }
    }
    return tags;
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
      .child('images/' + uuid.v4());
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  }

  post = async(uri) => {
    const { navigation } = this.props;
    const successHandler = navigation.getParam('successHandler');
    const errorHandler = navigation.getParam('errorHandler');

    const uploadUrl = await this.uploadImageAsync(uri)
    .then(response=>response)
    .catch((e)=>errorHandler(e));
    const postId = 9999999999999 - (new Date()).getTime();
    const address = await axios(`${OpenCage}?q=${this.state.location.latitude}+${this.state.location.longitude}&key=${OpenCageAPI}`)
    .then(response=>response.data.results[0].formatted)
    .catch(()=>alert("yes"));
    axios({
      method: 'PUT',
      url: `${FireBase}/post/${postId}.json?auth=${this.props.token}`,
      data: {
        id:postId,
        url:uploadUrl,
        disc:this.state.disc,
        region : this.state.location,
        userid:this.props.userid,
        address,
        tags:this.stringToTag(this.state.disc)
      },
    }).then(successHandler)
      .catch((e)=>errorHandler(e));

    this.props.navigation.goBack(null);
  }

  render(){
    console.log(this.state)
    return(
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
          onPress={()=>this.post(this.state.image)}
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
        onChangeText={(disc) => this.setState({disc})}/>
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

const mapStateToProps =(store)=>{
  console.log(store)
  return{
    userid:store.login.userData.userid,
    token:store.login.userData.token,
  }
}

const AddPostConnect =connect(mapStateToProps,null)(AddPost);

export default RootStack = createStackNavigator(
  {
    AddPost:{
      screen:AddPostConnect,
    },
    AddLocation:{
      screen: AddLocation,
    },
    AddPicture:{
      screen : AddPicture,
    },
    Home:{
      screen:Home,
    }
  },
  {
    initialRouteName: 'AddPost',
    headerMode:'none'
  }
);


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