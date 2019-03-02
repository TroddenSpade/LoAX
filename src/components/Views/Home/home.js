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
import DropdownAlert from 'react-native-dropdownalert';

import Loading from '../../screens/loading';
import { getPosts } from '../../../redux/action/getPosts';
import { getMyPosts,getMyData } from '../../../redux/action/getMyProfile';

import List from './postsList';

class Home extends React.Component {

  state={
    loadposts:false,
    scrollY:0,
    refreshing:false,
  }

  componentWillMount(){
    this.props.getPosts();
    this.props.getMyData(this.props.userid);
    this.props.getMyPosts(this.props.userid);
  }

  list = ()=>(
    this.props.list.map((item,id)=>(
    <List  
      key={id} posts={item}
      locationHandler={() => this.props.navigation.navigate('Parallax',{data:item})}
      profileHandler={()=>this.props.navigation.navigate('Profile',{data:item.userid})}
      tagHandler={(tag)=>this.props.navigation.navigate('Search',{tag:tag})}/>
    ))
  )

  handleScroll=(event)=>{
    if(event.nativeEvent.contentOffset.y >= this.state.scrollY
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
      <DropdownAlert defaultContainer={{paddingTop: 20,padding: 5}} ref={ref => this.dropdown = ref} />

      <View style={styles.topBar}>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('AddPost',
          {
          successHandler:()=>this.dropdown.alertWithType('success', 'successfully updated', 'All changes have been done ;) '),
          errorHandler:(e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `)
          })}>
            <Feather
              name="camera"
              color={"grey"}
              size={30}/>
          </TouchableOpacity>

        <View>
          
          <Text style={styles.logoText}>
          L<Image style={styles.logo} source={require('../../../utils/LoAX.png')}/>AX
          </Text> 
            
        </View>

        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('Search')}>
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
  return {
    list: state.posts.list,
    isLoading: state.posts.loading,
    lastKey:state.posts.lastKey,
    userid:state.login.userData.userid,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getPosts,getMyPosts,getMyData},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const styles =StyleSheet.create({
  logo:{
    width:30,
    height: 30,
  },
  logoText:{
    fontSize:30,
    color: "lightgreen",
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