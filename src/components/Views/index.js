import React from 'react';
import { createBottomTabNavigator, createAppContainer,createStackNavigator } from 'react-navigation';
import { Entypo,AntDesign } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from './Home/home';
import ProfileTab from './profile/profileTab';
import LocationTab from './locationTab';

import Parallax from '../screens/parallax';
import Profile from '../screens/profile';
import AddPost from './AddPost/index';

import { getPosts } from '../../redux/action/getPosts';
import { getMyData,getMyPosts } from '../../redux/action/getMyProfile';


TabNavigation = createAppContainer(createBottomTabNavigator({
  location: {
    screen:LocationTab,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <Entypo
              name="location"
              color={tintColor}
              size={30}
          />
      )
    })
  },

  home:{
    screen:Home,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <AntDesign
              name="home"
              color={tintColor}
              size={40}
          />
      )
    })
  },

  profile :{
    screen:ProfileTab,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
          <AntDesign
              name="user"
              color={tintColor}
              size={35}
          />
      )
    })
  },
},
{
  initialRouteName : "home",
  tabBarOptions:{
    showLabel: false,
    activeTintColor: "lightgreen",
    style:{
      borderTopWidth: 3,
      borderTopColor: "lightgreen",
      height:60, 
    }
  }

}));



const RootStack = createStackNavigator(
  {
    Main:{
      screen:TabNavigation,
    },
    Parallax:{
      screen: Parallax,
    },
    Profile:{
      screen : Profile,
    },
    AddPost:{
      screen: AddPost,
    }
  },
  {
    initialRouteName: 'Main',
    headerMode:'none'
  }
);

const AppContainer = createAppContainer(RootStack);

class Navigation extends React.Component {
  componentWillMount(){
    this.props.getPosts();
    this.props.getMyData(this.props.userid);
    this.props.getMyPosts(this.props.userid);
  }

  render() {
    return <AppContainer />;
  }
}

function mapStateToProps(state) {
  return {
    userid:state.login.userData.userid,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPosts,getMyPosts,getMyData},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);