import React from 'react'
import {
    View 
   ,Text
   ,Image
   ,StyleSheet
   ,Dimensions
   ,TouchableOpacity
} from 'react-native';
import {Entypo,AntDesign} from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

export default class Feed extends React.Component{
    constructor(props) {
        super(props);
        const userid = props.user.userid;
        if(props.posts.like.likers[userid]==true){
            this.state = {
                ...props,
                loadmore:false,
                like:true,
                likeCount:props.posts.like.likeCount
            };
        }else{
            this.state = {
                ...props,
                loadmore:false,
                like:false,
                likeCount:props.posts.like.likeCount
            };
        }    
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

    likeHandler=()=>{
        like(this.props.posts,this.props.user,()=>this.setState({like:true,likeCount:this.state.likeCount+1}))
    }

    dislikeHandler=()=>{
        dislike(this.props.posts,this.props.user,()=>this.setState({like:false,likeCount:this.state.likeCount-1}))
    }
    
    render(){
        return(
        <View>
            <View style={{height: 25}}/>
            <View style={styles.container}>
                <View style={styles.address}>
                    <Text style={{color:"grey"}}>{this.props.posts.address}</Text>
                </View>
                <View style={{justifyContent:'flex-end',alignItems: 'flex-start'}}>
                    <View>
                        <Image 
                        style={styles.images}
                        source={{uri:this.props.posts.url}}/>
                    </View> 
    
                    <View style={styles.transparentBar}>
                        <TouchableOpacity style={styles.userBar} onPress={()=>{this.props.profileHandler()}}>
                            <Image
                            style={styles.avatar}
                            source={{uri:this.props.posts.avatar}}/>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={styles.username}>{this.props.posts.username}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settings} onPress={this.props.modalHandler}>
                            <Entypo name="dots-three-horizontal" size={30} color='grey'/>
                        </TouchableOpacity>
                    </View>
    
                </View>
                    
                {this.state.like ? 
                <TouchableOpacity style={styles.likeBar} onPress={this.dislikeHandler}>
                    <AntDesign name="like1" size={25} color="lightgreen"/> 
                    <Text style={{color:"lightgreen",fontSize:15}}>{this.state.likeCount}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.likeBar} onPress={this.likeHandler}>
                    <AntDesign name="like2" size={25} color="grey"/> 
                    <Text style={{color:"grey",fontSize:15}}>{this.state.likeCount}</Text>
                </TouchableOpacity>}
    
                <View style={styles.caption}>
                    <View style={{flexDirection:'row',width:screenWidth-30,flexWrap: 'wrap'}}>{this.tagMaker(this.props.posts.disc)}</View>
                </View>
    
                <View style={styles.isLong}>
                    <AntDesign name="minus" size={30} color='lightgreen'/>
                </View>
                
            
            </View>
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