import React from 'react';
import {
    View 
   ,Text
   ,Image
   ,Button
   ,ScrollView
   ,StyleSheet
   ,Dimensions
   ,TouchableOpacity
,TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import {Entypo,SimpleLineIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';

import Loading from '../screens/loading';
import { getPosts } from '../../redux/action/getPosts';

const screenWidth = Dimensions.get("window").width;

const list =(posts)=>{
    const postslist = posts.map( (item,id)=>{
        return(
        <View key={id} style={{borderBottomColor: 'lightgrey',borderBottomWidth:1,}}>
            <View style={{flexDirection:'column'}}> 
                <TouchableWithoutFeedback
                onLongPress={()=>{alert('pressed')}}
                delayLongPress={1500}
                >
                    <Image 
                    style={styles.images}
                    source={{uri:item.url}}/>  
                </TouchableWithoutFeedback>  

                <TouchableOpacity style={styles.locationBar}>
                <View style={{flexDirection:'row',alignContent:'center',justifyContent: 'center'}}>
                    <Entypo name="location-pin" size={24} color="white"/>
                    <Text style={{fontSize:20 ,color:"white"}}>LOCATION</Text>
                </View>
                </TouchableOpacity>
            </View>

            <View style={styles.profile}>     
                <TouchableOpacity style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri:item.avatar}}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontSize:20,}}>{item.username}</Text>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection:'row',marginRight:10,}}>
                <TouchableOpacity style={{justifyContent:'center',marginRight:15}}>
                    <AntDesign name="like2" size={30} color="green" /> 
                </TouchableOpacity>
                
                <TouchableOpacity style={{justifyContent:'center',marginRight:10}}>
                    <Entypo name="dots-three-horizontal" size={30} color='green'/>
                </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.caption}>
                <Text style={{fontSize:20}}>{item.disc}</Text>
            </View>
            
        </View>
        )
        
    })
    return postslist
}



class PostsList extends React.Component{
    
    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        console.log(this.props.isLoading)
        
        if(this.props.isLoading)
            return <Loading/>
        else
            return(
            <ScrollView>
                {list(this.props.list)}
            </ScrollView>)
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


export default connect(mapStateToProps,mapDispatchToProps)(PostsList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    images:{
        width:screenWidth,
        height: screenWidth-30,
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'green',
        margin: 10,
    },
    profile:{
        flexDirection:"row",
        height: 55,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    locationBar:{
        backgroundColor: "green", 
        height: 40,
        justifyContent: 'center'
    },
    catption:{

    }
})