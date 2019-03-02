import React from 'react';
import {
    View 
   ,Text
   ,Image
   ,StyleSheet
   ,Dimensions
   ,TouchableOpacity
   ,TouchableWithoutFeedback
} from 'react-native';
import {Entypo,AntDesign} from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export default class List extends React.Component{
    state={
        loadmore:false,
        like:false,
    }
    
    likeHandler= async()=>{
        this.setState({like: !this.state.like});
        this.color = await this.state.like ? 'lightgreen' : 'grey';
    }

    loadmoreHandler=()=>{
        this.setState({loadmore:!this.state.loadmore})
    }

    tagMaker=(str)=>{
        const arrayOfstr = str.split(' ');
        return arrayOfstr.map((item,id)=>{
            if(item.length>1 && item[0]=='#')
                return(
                <TouchableOpacity key={id} onPress={()=>this.props.tagHandler(item.substring(1))}>
                <Text style={{color:'grey',fontWeight:'bold',fontSize:15}}>{item} </Text>
                </TouchableOpacity>
                )
            else    return(<Text style={{color:'grey',fontSize:15}}>{item} </Text>)
        })
    }

    shortCaption=(str)=>{
        if(str.length > 70)
            return this.tagMaker(str.substring(null,70)+" ...");
        else    return this.tagMaker(str);
    }

    render(){
        return(
        <View style={styles.container}>
            <View style={styles.address}>
                <Text style={{color:"black"}}>{this.props.posts.address}</Text>
            </View>
            <View style={{justifyContent:'flex-end',alignItems: 'flex-start'}}>
                <TouchableWithoutFeedback
                onLongPress={() => {this.props.locationHandler()}}
                delayLongPress={1500}>
                    <Image 
                    style={styles.images}
                    source={{uri:this.props.posts.url}}/>
                </TouchableWithoutFeedback> 

                <View style={styles.transparentBar}>
                    <TouchableOpacity style={styles.userBar} onPress={()=>{this.props.profileHandler()}}>
                        <Image
                        style={styles.avatar}
                        source={{uri:this.props.posts.avatar}}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.username}>{this.props.posts.username}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settings}>
                        <Entypo name="dots-three-horizontal" size={30} color='grey'/>
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={styles.locationBar} onPress={() => {this.props.locationHandler()}}>
                <View style={{flexDirection:'row',alignContent:'center',justifyContent: 'center'}}>
                    <Entypo name="location-pin" size={24} color="white"/>
                    <Text style={{fontSize:20 ,color:"white"}}>LOCATION</Text>
                </View>
            </TouchableOpacity>

            
            {this.state.like ? 
            <TouchableOpacity style={styles.likeBar} onPress={this.likeHandler}>
                <AntDesign name="like1" size={25} color="lightgreen"/> 
                <Text style={{color:"lightgreen",fontSize:15}}>{1002}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.likeBar} onPress={this.likeHandler}>
                <AntDesign name="like2" size={25} color="grey"/> 
                <Text style={{color:"grey",fontSize:15}}>{1002}</Text>
            </TouchableOpacity>}


            <View style={styles.caption}>
                {this.state.loadmore ?
                <View style={{flexDirection:'row',width:screenWidth-30,flexWrap: 'wrap'}}>{this.tagMaker(this.props.posts.disc)}</View>
                :
                <View style={{flexDirection:'row',width:screenWidth-30,flexWrap: 'wrap'}}>{this.shortCaption(this.props.posts.disc)}</View>}
            </View>

            {this.props.posts.disc.length <= 70 ? 
            <View style={styles.isLong}>
                <AntDesign name="minus" size={30} color='lightgreen'/>
            </View>
            :
            this.state.loadmore ?
            <View style={styles.isLong}>
                <AntDesign name="minus" size={30} color='lightgreen'/>
            </View>
            :
            <TouchableOpacity style={styles.loadmore} onPress={this.loadmoreHandler}>
                <Entypo name="chevron-down" size={30} color='lightgreen'/>
            </TouchableOpacity>}
            
        </View>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5,
        borderWidth: 1,
        borderColor:"lightgreen",
        borderRadius:20,
    },
    transparentBar:{
        width:screenWidth-10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
    },
    address:{
        height:40,
        padding:5,
    },
    userBar:{
        flexDirection: "row",
        backgroundColor: "white",
        padding:5,
        borderTopRightRadius: 20,

    },
    username:{
        color:"grey",
        fontSize: 20,
        marginRight: 5,
        marginLeft: 5
    },
    avatar:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'green',
    },
    images:{
        width:screenWidth-10,
        height:screenWidth-10,
    },
    locationBar:{
        backgroundColor: "lightgreen",
        height: 40,
        width: screenWidth-10,
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    settings:{
        backgroundColor: 'white',
        width:40,
        height: 40,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeBar:{
        width: screenWidth-10,
        padding: 5,
        marginLeft:10, 
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: 'flex-end',
    },
    caption:{
        flexDirection:"row",
        justifyContent: "flex-start",
        width:screenWidth-10,
        padding: 10
    },
    loadmore:{
        height:20,
        alignItems: "center",
        justifyContent: "center",
    }
})