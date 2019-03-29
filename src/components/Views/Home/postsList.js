import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { LinearGradient, Font } from "expo";

// import { like,dislike } from '../../../redux/action/like';

const screenWidth = Dimensions.get("window").width;

export default class List extends React.Component {
  constructor(props) {
    super(props);
    // const userid = props.user.user_id;
    // if(props.posts.like.likers[userid]==true){
    this.state = {
      ...props,
      loadmore: false,
      fontLoaded: false
      // like:true,
      // likeCount:props.posts.like.likeCount
    };
    // }else{
    //     this.state = {
    //         ...props,
    //         loadmore:false,
    //         like:false,
    //         likeCount:props.posts.like.likeCount
    //     };
    // }
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     Lobster: require("../../../../assets/fonts/Lobster-Regular.ttf")
  //   });
  //   this.setState({ fontLoaded: true });
  // }

  // likeHandler=()=>{
  //     like(this.props.post,this.props.user,()=>this.setState({like:true,likeCount:this.state.likeCount+1}))
  // }

  // dislikeHandler=()=>{
  //     dislike(this.props.post,this.props.user,()=>this.setState({like:false,likeCount:this.state.likeCount-1}))
  // }

  loadmoreHandler = () => {
    this.setState({ loadmore: !this.state.loadmore });
  };

  tagMaker = str => {
    const arrayOfstr = str.split(" ");
    return arrayOfstr.map((item, id) => {
      if (item.length > 1 && item[0] == "#")
        return (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.tagHandler(item.substring(1))}
          >
            <Text style={{ color: "grey", fontWeight: "bold", fontSize: 15 }}>
              {item}{" "}
            </Text>
          </TouchableOpacity>
        );
      else
        return (
          <View key={id}>
            <Text style={{ color: "grey", fontSize: 15 }}>{item} </Text>
          </View>
        );
    });
  };

  shortCaption = str => {
    if (str.length > 70) return this.tagMaker(str.substring(null, 70) + " ...");
    else return this.tagMaker(str);
  };

  render() {
    return (
      <LinearGradient
        style={styles.body}
        colors={["#79CB52", "#225377"]}
        start={[1, 0]}
        end={[0, 0]}
      >
        <View style={styles.container}>
          <View style={styles.address}>
            <Text style={{ color: "black" }}>{this.props.post.address}</Text>
          </View>
          <View
            style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
          >
            <TouchableWithoutFeedback
              onLongPress={() => {
                this.props.locationHandler();
              }}
              delayLongPress={1500}
            >
              <Image
                style={styles.images}
                source={{ uri: `${this.props.post.image_url}` }}
              />
            </TouchableWithoutFeedback>

            <View style={styles.transparentBar}>
              <TouchableOpacity
                style={styles.userBar}
                onPress={() => {
                  this.props.profileHandler();
                }}
              >
                <Image
                  style={styles.avatar}
                  source={{ uri: this.props.post.user_data.avatar }}
                />
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.username}>
                    {this.props.post.user_data.username}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settings}
                onPress={this.props.modalHandler}
              >
                <Entypo name="dots-three-horizontal" size={25} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            style={styles.locationBar}
            colors={["#79CB52", "#225377"]}
            start={[1, 0]}
            end={[0, 0]}
          >
            <TouchableOpacity
              style={styles.locationBar}
              onPress={() => {
                this.props.locationHandler();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <Entypo name="location-pin" size={24} color="white" />
                {/* { this.state.fontLoaded ? */}
                <Text style={{ fontSize: 20, color: "white" }}>LOCATION</Text>
                {/* :null} */}
              </View>
            </TouchableOpacity>
          </LinearGradient>

          {/* {this.state.like ? 
            <TouchableOpacity style={styles.likeBar} onPress={this.dislikeHandler}>
                <AntDesign name="like1" size={25} color="lightgreen"/> 
                <Text style={{color:"lightgreen",fontSize:15}}>{this.state.likeCount}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.likeBar} onPress={this.likeHandler}>
                <AntDesign name="like2" size={25} color="grey"/> 
                <Text style={{color:"grey",fontSize:15}}>{this.state.likeCount}</Text>
            </TouchableOpacity>} */}

          <View style={styles.caption}>
            {this.state.loadmore ? (
              <View
                style={{
                  flexDirection: "row",
                  width: screenWidth - 30,
                  flexWrap: "wrap"
                }}
              >
                {this.tagMaker(this.props.post.caption)}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: screenWidth - 30,
                  flexWrap: "wrap"
                }}
              >
                {this.shortCaption(this.props.post.caption)}
              </View>
            )}
          </View>

          {this.props.post.caption.length <= 70 ? (
            <View style={styles.isLong}>
              <AntDesign name="minus" size={30} color="#469577" />
            </View>
          ) : this.state.loadmore ? (
            <View style={styles.isLong}>
              <AntDesign name="minus" size={30} color="#469577" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loadmore}
              onPress={this.loadmoreHandler}
            >
              <Entypo name="chevron-down" size={30} color="#469577" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth - 14,
    margin: 2
  },
  body: {
    width: screenWidth - 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 20
  },
  transparentBar: {
    width: screenWidth - 14,
    height: 34,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute"
  },
  address: {
    height: 40,
    padding: 5
  },
  userBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    borderTopRightRadius: 20
  },
  username: {
    color: "grey",
    fontSize: 18,
    marginRight: 5,
    marginLeft: 5
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13
  },
  images: {
    width: screenWidth - 14,
    height: screenWidth - 14
  },
  locationBar: {
    height: 40,
    width: screenWidth - 14,
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  settings: {
    backgroundColor: "white",
    width: 34,
    height: 34,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  likeBar: {
    width: screenWidth - 14,
    padding: 5,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  caption: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: screenWidth - 14,
    padding: 10
  },
  loadmore: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
