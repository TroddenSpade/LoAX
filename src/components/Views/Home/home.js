import React from "react";
import { 
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView, } from "react-native";
import { connect } from 'react-redux';
import { Font } from 'expo';

import Loading from '../../screens/loading';
import { getPosts } from '../../../redux/action/getPosts';
import List from './postsList';

class Home extends React.Component {

  state={
    fontLoaded: false
  }

  async componentDidMount() {
    this.props.getPosts();
    await Font.loadAsync({
      'Pacifico-Regular': require('../../../../assets/fonts/Pacifico-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  list = ()=>(
    this.props.list.map((item,id)=>(
    <List key={id} posts={item}
    handler={() => this.props.navigation.navigate('Parallax',{data:item})}/>
    ))
  )

  render() {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.topBar}>
        <View>
        {this.state.fontLoaded ? (
          <Text style={styles.logoText}>
          l<Image style={styles.logo} source={require('../../../utils/LoAX.png')}/>ax
          </Text> 
          ) : null}
        </View>
      </View>

      
     {this.props.isLoading?
        <Loading/>
      :
      <ScrollView>
        {this.list()}
      </ScrollView>}
    
    </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
      list: state.posts.list,
      isLoading: state.posts.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const styles =StyleSheet.create({
  logo:{
    width:30,
    height: 30,
  },
  logoText:{
    fontSize:30,
    color: "green",
    fontFamily: 'Pacifico-Regular'
  },
  topBar:{
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    width:"100%",
    borderBottomWidth:2,
    borderBottomColor:'lightgreen',
    marginTop: 20,
  }
})