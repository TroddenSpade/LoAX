import React from "react";
import { View, Text,ScrollView } from "react-native";
import { connect } from 'react-redux';

import ProfileList from './profile/profileList';

class Profile extends React.Component {
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ProfileList data={this.props.list}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      list: state.posts.list,
  }
}

function mapDispatchToProps(dispatch) {
  // return {
  //     getPosts: () => dispatch(getPosts())
  // }
}

export default connect(mapStateToProps)(Profile);