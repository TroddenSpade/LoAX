import React from "react";
import {
  View, 
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { MaterialCommunityIcons,Octicons } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from 'react-native-modal';

import { deletePost,getMyPosts } from '../../../redux/action/getMyProfile';
import { removeToken,getTokens } from '../../../utils/misc';
import ProfileList from './profileList';
import Loading from '../../screens/loading';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Profile extends React.Component {
  state={
    modalVisible:false,
    isDelete:false,
    modalId:null
  }

  list = (data)=>{
    console.log(data)
    return data.map((item,id)=>(
      <ProfileList key={id} data={item}
      postHandler={()=>this.props.navigation.navigate('Parallax',
      {data:Object.assign({},item,{username:this.props.myData.username,avatar:this.props.myData.pic})})}
      modalHandler={()=>this.setState({modalVisible:true,modalId:item.id})}/>
    ))
  }

  deletePost =()=>{
    deletePost(this.state.modalId,this.props.loginData.token,
      ()=>{
        this.props.getMyPosts(this.props.loginData.userid);
        this.dropdown.alertWithType('success', 'Successfully Deleted', 'Your Post has been Removed ;)');
      },
      (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
    
    this.setState({
      modalVisible:false,
      isDelete:false,
      modalId:null
    });
  }

  render(){
    if(this.props.postsLoading || this.props.profileLoading) return <Loading/>
    return (
      
      <View style={styles.container}>
        <DropdownAlert defaultContainer={{paddingTop: 20,padding: 5}} ref={ref => this.dropdown = ref} />
        <Modal
        isVisible={this.state.modalVisible}
        transparent={true}
        onBackButtonPress={()=>this.setState({modalVisible:false,isDelete:false})}
        onBackdropPress={()=>this.setState({modalVisible:false,isDelete:false})}>
        {this.state.isDelete ?
          <View style={styles.modalContent}>
            <Text>Are You Sure !??</Text>
            <View style={styles.delete}>
              <TouchableOpacity onPress={this.deletePost} style={styles.modalButton}>
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={()=>this.setState({isDelete:false})}>
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        :
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={()=>alert("it's not available right now !")} style={styles.modalButton}>
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}
            onPress={()=>this.setState({isDelete:true})}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>}
        </Modal>

        <View style={styles.topbar}>

          <View style={styles.topButton}>
            <TouchableOpacity
            onPress={()=>removeToken(()=>this.props.navigation.navigate('Login'))}>
              <Octicons name="sign-out" color={"lightgreen"} size={30}/>
            </TouchableOpacity>
            <View/>
            <View/>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Settings',
            {
              successHandler:()=>this.dropdown.alertWithType('success', 'successfully updated', 'All changes have been done ;) '),
              errorHandler:(e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `)
            })}>
              <MaterialCommunityIcons name="settings" color={"lightgreen"} size={30}/>
            </TouchableOpacity>
          </View>

          <View style={styles.profile}>
              <View style={{alignItems:'center'}}>
              <Image style={styles.avatar} source={{uri :this.props.myData.pic}}/>
              </View>
              
              <View style={styles.username}>
              <Text style={{fontSize:20,color:'grey'}}>{this.props.myData.username}</Text>
              </View>
          </View>

          <View style={styles.bio}>
            <Text>{this.props.myData.bio}</Text>
          </View>
        </View>

        <ScrollView>
          {this.list(this.props.myposts)}
        </ScrollView>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myposts: state.myProfile.myPosts,
    loginData:state.login.userData,
    postsLoading:state.myProfile.postsLoading,
    profileLoading:state.myProfile.profileLoading,
    myData:state.myProfile.myData,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getMyPosts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },  
  topbar:{
    width:screenWidth,
    flexDirection: 'column',
    marginTop: 40,
    marginBottom: 5,
  },
  profile:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center"
  },
  avatar:{
    height:60,
    width: 60,
    borderRadius: 30,
    alignItems:'center',

  },
  username:{
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  topButton:{
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bio:{
    justifyContent:"center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton:{
    height:50,
    margin: 5,
    borderColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  delete:{
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
})