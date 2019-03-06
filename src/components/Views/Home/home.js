import React from "react";
import { 
   View,
   Text,
   StyleSheet,
   Image,
   Button,
   ScrollView,
   RefreshControl,
   TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Feather,AntDesign } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from "react-native-modal";

import Loading from '../../screens/loading';
import { getPosts } from '../../../redux/action/getPosts';
import { getMyPosts,getMyData } from '../../../redux/action/getMyProfile';
import { report } from '../../../utils/misc';

import List from './postsList';

class Home extends React.Component {

  state={
    loadposts:false,
    scrollY:0,
    refreshing:false,
    modalVisible:false,
    modalId:null,
    isReport:false,
  }

  componentWillMount(){
    this.props.getPosts();
    this.props.getMyData(this.props.userid);
    this.props.getMyPosts(this.props.userid);
  }

  list = ()=>(
    this.props.list.map((item,id)=>(
    <List  
      key={id} posts={item} user={this.props.data}
      locationHandler={() => this.props.navigation.navigate('Parallax',{data:item})}
      profileHandler={()=>this.props.navigation.navigate('Profile',{data:item.userid})}
      tagHandler={(tag)=>this.props.navigation.navigate('Search',{tag:tag})}
      modalHandler={()=>this.setState({modalVisible:true,modalId:item.id})}/>
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
      
      <Modal
      isVisible={this.state.modalVisible}
      transparent={true}
      onBackButtonPress={()=>this.setState({modalVisible:false,isReport:false})}
      onBackdropPress={()=>this.setState({modalVisible:false,isReport:false})}>
        {this.state.isReport ? 
        <View style={styles.modalContent}>
        <TouchableOpacity
        style={styles.goback}
        onPress={()=>this.setState({isReport:false})}>
          <Text style={{fontSize:15,color:'lightgreen'}}><AntDesign name="back" size={15} color='lightgreen'/>GoBack</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.reports}
        onPress={()=>{
          report(this.state.modalId,'WRONG_LOCATION',this.props.data,
          ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
          (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
          this.setState({isReport:false,modalVisible:false})}
          }><Text>Wrong Location</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.reports}
        onPress={()=>{
          report(this.state.modalId,'UNRELATED_PICTURE',this.props.data,
          ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
          (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
          this.setState({isReport:false,modalVisible:false})}
        }><Text>Unrelated Picture</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.reports}
        onPress={()=>{
          report(this.state.modalId,'ADVERTISMENT',this.props.data,
          ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
          (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
          this.setState({isReport:false,modalVisible:false})}
        }><Text>Advertisment</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.reports}
        onPress={()=>{
          report(this.state.modalId,'VIOLENCE',this.props.data,
          ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
          (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
          this.setState({isReport:false,modalVisible:false})}
        }><Text>Violence</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.reports}
        onPress={()=>{
          report(this.state.modalId,'NUDITY_PORNOGRAPHY',this.props.data,
          ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
          (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
          this.setState({isReport:false,modalVisible:false})}
        }><Text>Nudity & Pornography</Text></TouchableOpacity>
        </View>
        :
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={()=>alert("it's not available right now !")} style={styles.reports}>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({isReport:true})} style={styles.reports}>
            <Text>Report</Text>
          </TouchableOpacity>
        </View>}
      </Modal>

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
        colors={["#469976", "#72CE4E","#489C74"]}/>
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
    data:state.login.userData,
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  reports:{
    height:50,
    width: '100%',
    margin: 5,
    borderColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  goback:{
    height:30,
    width: '50%',
    margin: 5,
    borderColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
  }
})