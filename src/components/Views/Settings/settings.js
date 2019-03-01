import React from 'react';
import { View,Text,StyleSheet,Button,Dimensions,TextInput,Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Permissions,ImagePicker } from 'expo';
import * as firebase from 'firebase';
import uuid from 'uuid';

import { updateData } from '../../../redux/action/getMyProfile';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Settings extends React.Component{
    state={
        name:this.props.myData.name,
        bio:this.props.myData.bio,
        lastAvatar:this.props.myData.pic,
        image:null
    }

    useCamera= async ()=>{
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        response = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[1,1],
        })
        if(response.cancelled == false){
            this.setState({
                cancelled:response.cancelled,
                image:response.uri,
            })
        }
    }

    useGallery= async ()=>{
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        response = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect: [1,1],
        })
        if(response.cancelled == false){
            this.setState({
                cancelled:response.cancelled,
                image:response.uri,
            })
        }
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
        // We're done with the blob, close and release it
        blob.close();
        return await snapshot.ref.getDownloadURL();
    }

    update= async ()=>{
        const { navigation } = this.props;
        const successHandler = navigation.getParam('successHandler');
        const errorHandler = navigation.getParam('errorHandler');

        if(this.state.image == null){
            var avatarUrl = this.state.lastAvatar;
        }else{
            var avatarUrl = await this.uploadImageAsync(this.state.image);
        }
        this.props.updateData(this.state,avatarUrl,this.props.myData,this.props.token)
        .then(successHandler)
        .catch((e)=>errorHandler(e))
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{height:25}}/>

                <View style={styles.update}>
                    <Button title='update profile' color='lightgreen' onPress={this.update}/>
                </View>

                <View style={styles.settings}>
                    <View>
                        <Text>Name :</Text>
                        <TextInput
                        maxLength={30}
                        value={null}
                        placeholder={this.props.myData.name}
                        style={styles.name}
                        onChangeText={(name) => this.setState({name})}/>
                    </View>

                    <View>
                        <Text>Bio:</Text>
                        <TextInput
                        multiline={true}
                        maxLength={150}
                        placeholder={this.props.myData.bio}
                        style={styles.bio}
                        onChangeText={(bio) => this.setState({bio})}/>
                    </View>

                    <View>
                        <Text>Profile Photo:</Text>
                        <View style={styles.avatar}>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
                                <View style={{margin:10}}>
                                <Button title='Gallery' onPress={this.useGallery} color='lightgreen'/>
                                </View>
                                <Image
                                style={styles.pic1}
                                source={{uri:this.state.lastAvatar}}/>
                                <View style={{margin:10}}>
                                <Button title='Camera' onPress={this.useCamera} color='lightgreen'/>
                                </View>
                            </View>
                            <Image
                            style={styles.pic2}
                            source={{uri:this.state.lastAvatar==null ? this.state.image : this.state.lastAvatar}}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

mapStateToProps=(state)=>{
    console.log(state)
    return{
        myData:state.myProfile.myData,
        token:state.login.userData.token
    }
}

mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({updateData},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
        alignItems: 'center',
    },
    update:{
        width:screenWidth,
    },
    settings:{
        height: screenHeight-65,
        flexDirection:'column',
        justifyContent: 'space-around'
    },
    name:{
        width:screenWidth*3/4,
        height:35,
        borderColor: 'lightgreen',
        borderWidth: 2,
        borderRadius: 10,
        padding:5,

    },
    bio:{
        width:screenWidth*3/4,
        height:100,
        borderColor: 'lightgreen',
        borderWidth: 2,
        borderRadius: 10,
        padding:5,
        textAlignVertical:"top",

    },
    avatar:{
        justifyContent:'center',
        alignItems: 'center',
    },
    pic1:{
        width:80,
        borderWidth: 2,
        borderRadius: 40,
        height: 80,
        borderColor: 'lightgreen',
        marginBottom: 5,

    },
    pic2:{
        width:200,
        borderWidth: 2,
        borderRadius: 100,
        height: 200,
        borderColor: 'lightgreen',

    }
})