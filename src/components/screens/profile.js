import React from 'react';
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
import { bindActionCreators } from 'redux';

import Loading from './loading';
import ProfileList from '../Views/profile/profileList';
import { getProfile } from '../../redux/action/getProfile';

const screenWidth = Dimensions.get("window").width;

class Profile extends React.Component{
    componentWillMount(){
        const { navigation } = this.props;
        const userid = navigation.getParam('data');
        this.props.getProfile(userid);
    }

    list = (data)=>{
        return data.map((item,id)=>(
            <ProfileList key={id} data={item}
            postHandler={()=>this.props.navigation.navigate('Parallax',
            {data:Object.assign({},item,{username:this.props.profile.username,avatar:this.props.profile.pic})})}/>
        ))
    }

    render(){
        if(this.props.postsLoading || this.props.profileLoading)    return <Loading/>
        return(
        <View style={styles.container}>
            <View style={styles.topbar}>

                <View style={styles.profile}>
                    <View style={{alignItems:'center'}}>
                    <Image style={styles.avatar} source={{uri :this.props.profile.pic}}/>
                    </View>
                    
                    <View style={styles.username}>
                    <Text style={{fontSize:20,color:'green'}}>{this.props.profile.username}</Text>
                    </View>
                </View>

                <View style={styles.bio}>
                    <Text>{this.props.profile.bio}</Text>
                </View>
            </View>

            <ScrollView>
                {this.list(this.props.posts)}
            </ScrollView>

        </View>
    )}
}

const mapStateToProps =(state)=>{
    return{
        profile : state.profile.profile,
        posts:state.profile.posts,
        postsLoading:state.profile.postsLoading,
        profileLoading:state.profile.profileLoading,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators({getProfile},dispatch)
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
  }
})