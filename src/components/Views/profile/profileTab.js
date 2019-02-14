import React from "react";
import {
  View, 
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import ProfileList from './profileList';
import Loading from '../../screens/loading';

const screenWidth = Dimensions.get("window").width;


class Profile extends React.Component {

  render(){
    if(this.props.postsLoading || this.props.profileLoading) return <Loading/>
    return (
      
      <View>
        <View style={styles.profile}>
          <View style={styles.settings}>
            <Text>setting</Text>
          </View>

          <View style={styles.avatar}>
              <View style={{alignItems:'center'}}>
              <Image style={styles.imagePro} source={{uri :this.props.myData.pic}}/>
              </View>
              
              <View style={styles.username}>
              <Text style={{fontSize:20,color:'green'}}>{this.props.myData.username}</Text>
              </View>
          </View>

          <View style={styles.bio}>
            <Text>BIO DOOOOOO DOOOOO LOOOO</Text>
          </View>

        </View>
      
      <ProfileList data={this.props.myposts}/>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myposts: state.myProfile.myPosts,
    userid:state.login.userData.userid,
    postsLoading:state.myProfile.postsLoading,
    profileLoading:state.myProfile.profileLoading,
    myData:state.myProfile.myData,
  }
}

export default connect(mapStateToProps,null)(Profile);

const styles=StyleSheet.create({
  block:{
      height:100,
      borderColor: 'lightgrey',
      borderBottomWidth:1, 
  },
  inside:{
      marginLeft: 2,
      marginRight: 10,
      flexDirection:"row",
      justifyContent: "space-between",
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
  bio:{
    justifyContent:"center"
  }
})