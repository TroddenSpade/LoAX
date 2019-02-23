import React from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import Loading from '../../screens/loading';
import List from './searchList';
import { search } from '../../../redux/action/search';

class Search extends React.Component{

    state={
        input:'',
        tag:'',
        loading : null,
        loadposts:false,
        scrollY:0,
        refreshing:false,
    }

    changePassHandler=(input)=>{
        this.setState({input});
    }

    list = ()=>(
        this.props.posts.map((item,id)=>(
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
        const REFRESH = "";
        this.setState({refreshing: true});
        this.props.search(REFRESH,this.state.tag)
        .then(()=>{this.setState({refreshing:false,scrollY:0})});
    }

    search =()=>{
        this.setState({tag:this.state.input})
        this.setState({loading:true});
        this.props.search(null,this.state.tag)
        .then(()=>this.setState({loading:false}));
        console.log(this.state.loading)
    }

    render(){
        return(
            <View style={styles.container}>
                
                {this.props.loading || this.state.loading==null ?
                <View>
                    <Text>search</Text>
                </View>
                :
                <ScrollView>{this.list()}</ScrollView>}

                <View style={styles.searchBar}>
                    <View>
                        <TextInput
                        maxLength={30}
                        style={styles.input}
                        placeholder="Search"
                        onChangeText={this.changePassHandler}/>
                    </View>

                    <TouchableOpacity style={styles.search} onPress={this.search}>
                        <AntDesign name="search1" color={"grey"} size={30}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const mapStateToProps =(state)=>{
    console.log(state);
    return{
        posts:state.search.list,
        loading:state.search.loading,
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
    },
    search:{
        paddingRight:5,
    }
});