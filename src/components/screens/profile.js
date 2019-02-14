import React from 'react';
import {
    View, 
    Image,
    Text,
    StyleSheet,
    Dimensions
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
        console.log(userid);
        this.props.getProfile(userid);
    }

    render(){
        if(this.props.postsLoading || this.props.profileLoading)    return <Loading/>
        return(
            <View>
                <View style={styles.profile}>
                <View style={styles.settings}>
                    <Text>setting</Text>
                </View>

                <View style={styles.avatar}>
                    <View style={{alignItems:'center'}}>
                    <Image style={styles.imagePro} source={{uri :this.props.profile.pic}}/>
                    </View>
                    
                    <View style={styles.username}>
                    <Text style={{fontSize:20,color:'green'}}>{this.props.profile.username}</Text>
                    </View>
                </View>
                </View>
            
            <ProfileList data={this.props.posts}/>

            </View>
        )
    }
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
    
    }
})