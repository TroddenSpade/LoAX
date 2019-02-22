import React from "react";
import { 
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   RefreshControl,
   TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Feather,AntDesign } from '@expo/vector-icons';
import { Font } from 'expo';

import Loading from '../../screens/loading';
import { getPosts } from '../../../redux/action/getPosts';
import List from './postsList';

class Home extends React.Component {

  state={
    fontLoaded: false,
    loadposts:false,
    scrollY:0,
    refreshing:false,
  }

  async componentWillMount(){
    await Font.loadAsync({
      'Pacifico-Regular': require('../../../../assets/fonts/Pacifico-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  list = ()=>(
    this.props.list.map((item,id)=>(
    <List  
      key={id} posts={item}
      locationHandler={() => this.props.navigation.navigate('Parallax',{data:item})}
      profileHandler={()=>this.props.navigation.navigate('Profile',{data:item.userid})}/>
    ))
  )

  handleScroll=(event)=>{
    if(event.nativeEvent.contentOffset.y > this.state.scrollY
       && !this.state.loadposts
       && this.props.lastKey!=undefined){
      this.setState({loadposts:true});
      this.props.getPosts(this.props.lastKey)
      .then(()=>{
        this.setState({
          loadposts:false,
          scrollY:this.state.scrollY+2000,
        });
      })
    }
  }
  
  onRefresh = () => {
    const REFRESH = "";
    this.setState({refreshing: true});
    this.props.getPosts(REFRESH)
    .then(()=>{this.setState({refreshing:false,scrollY:0})});
  }

  render() {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <View style={styles.topBar}>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('AddPost')}>
            <Feather
              name="camera"
              color={"grey"}
              size={30}/>
          </TouchableOpacity>

        <View>
          {this.state.fontLoaded ? (
            <Text style={styles.logoText}>
            l<Image style={styles.logo} source={require('../../../utils/LoAX.png')}/>AX
            </Text> 
            ) : null}
        </View>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('')}>
            <AntDesign
              name="search1"
              color={"grey"}
              size={30}/>
          </TouchableOpacity>

      </View>

      
     {this.props.isLoading?
        <Loading/>
      :
      <ScrollView
      onScroll={this.handleScroll}
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        colors={["#19649E", "#469976", "#72CE4E","#489C74"]}/>
      }>
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
      lastKey:state.posts.lastKey,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getPosts},dispatch);
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
    justifyContent: "space-around",
    alignItems: "center",
    width:"100%",
    borderBottomWidth:2,
    borderBottomColor:'lightgreen',
    marginTop: 20,
  }
})