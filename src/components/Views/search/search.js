import React from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from "react-native-modal";

import Loading from '../../screens/loading';
import List from './searchList';
import { search } from '../../../redux/action/search';
import { report } from '../../../utils/misc';

const screenWidth = Dimensions.get("window").width;

class Search extends React.Component{

    state={
        input:'',
        tag:'',
        loading : null,
        loadposts:false,
        scrollY:0,
        refreshing:false,
        modalVisible:false,
        modalId:null,
        isReport:false,
    }

    data = this.props.posts;

    async componentWillMount(){
        const { navigation } = this.props;
        const tag = navigation.getParam('tag');
        if(tag!=undefined){
            await this.setState({input:tag})
            this.search();
        }
    }

    changePassHandler=(input)=>{
        this.setState({input});
    }

    list = ()=>(
        this.props.posts.map((item,id)=>(
        <List  
          key={id} posts={item}
          locationHandler={() => this.props.navigation.navigate('Parallax',{data:item})}
          profileHandler={()=>this.props.navigation.navigate('Profile',{data:item.userid})}
          tagHandler={(tag)=>this.props.navigation.navigate('Search',{tag:tag})}
          modalHandler={()=>this.setState({modalVisible:true,modalId:item.id})}/>
        ))
      )

    handleScroll=(event)=>{
        if(event.nativeEvent.contentOffset.y > this.state.scrollY
           && !this.state.loadposts
           && this.props.lastKey!=undefined){
          this.setState({loadposts:true});
          this.props.search(this.props.lastKey,this.state.tag)
          .then(()=>{
            this.setState({
              loadposts:false,
              scrollY:this.state.scrollY+2000,
            });
          })
        }
    }

    onRefresh = () => {
        const RELOAD = -1;
        this.setState({refreshing: true});
        this.props.search(RELOAD,this.state.tag)
        .then(()=>{this.setState({refreshing:false,scrollY:0})});
    }

    search =async()=>{
        const FIRST_LOAD = 0;
        this.setState({tag:this.state.input})
        this.props.search(FIRST_LOAD,this.state.tag);
    }

    searchScreen=()=>{
        if(this.props.loading == true){
            return <Loading/>
        }else if(this.props.loading == false){
            return(
                <ScrollView
                onScroll={this.handleScroll}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    colors={["#19649E", "#469976", "#72CE4E","#489C74"]}/>
                }>
                <View style={styles.blank}/>
                    {this.list()}
                </ScrollView>
            )
        }else{
            return(
                <View style={styles.searchScreen}>
                    <MaterialCommunityIcons name="feature-search" color={"lightgreen"} size={100}/>
                    <Text style={{fontSize:20,color:"lightgreen"}}>Search For Tags !</Text>
                </View>
            )
        }
    }
    
    render(){
        return(
            <View style={styles.container}>

                {this.searchScreen()}

                <View style={styles.searchBar}>
                    <View>
                        <TextInput
                        maxLength={30}
                        style={styles.input}
                        placeholder="Search"
                        value={this.state.input}
                        onChangeText={this.changePassHandler}/>
                    </View>

                    <TouchableOpacity style={styles.search} onPress={this.search}>
                        <AntDesign name="search1" color={"grey"} size={30}/>
                    </TouchableOpacity>
                </View>
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
            </View>
        )
    }
}

const mapStateToProps =(state)=>{
    console.log(state);
    return{
        posts:state.search.list,
        loading:state.search.loading,
        data:state.login.userData,
    }
}

const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators({search},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
    },
    searchBar:{
        marginTop: 25,
        width:'90%',
        height: 50,
        borderColor: "lightgreen",
        borderWidth: 3,
        borderRadius:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        position: 'absolute',
        alignSelf: 'center'
    },
    input:{
        paddingLeft:5,
        width:screenWidth*8/10,
    },
    search:{
        paddingRight:5,
    },
    searchScreen:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    blank:{
        height:75,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 128, 0, 0.1)',
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
});