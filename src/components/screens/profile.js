import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LinearGradient, Constants } from "expo";

import Loading from "./loading";
import ProfileList from "./profileList";
import { getProfile, getUserPosts } from "../../redux/action/getProfile";

const screenWidth = Dimensions.get("window").width;

class Profile extends React.Component {
  state = {
    loadposts: false,
    scrollY: 0,
    refreshing: false
  };

  componentWillMount() {
    const { navigation } = this.props;
    this.userid = navigation.getParam("data");
    this.props.getProfile(this.userid);
    this.props.getUserPosts(this.userid, 0, 0, () => {});
  }

  list = data => {
    return data.map((item, id) => (
      <ProfileList
        key={id}
        data={item}
        postHandler={() =>
          this.props.navigation.navigate("Parallax", {
            data: Object.assign({}, item, {
              user_data: {
                username: this.props.user.username,
                avatar: this.props.user.avatar
              }
            })
          })
        }
      />
    ));
  };

  handleScroll = event => {
    if (
      event.nativeEvent.contentOffset.y >= this.state.scrollY &&
      !this.state.loadposts &&
      this.props.skip != undefined
    ) {
      this.setState({ loadposts: true });
      this.props.getUserPosts(this.userid, this.props.skip, -1, () => {
        this.setState({
          loadposts: false,
          scrollY: this.state.scrollY + 150
        });
      });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getUserPosts(this.userid, 0, 1, () => {
      this.setState({ refreshing: false, scrollY: 0 });
    });
  };

  render() {
    if (this.props.postsLoading || this.props.profileLoading)
      return <Loading />;
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.profile}>
            <LinearGradient
              style={styles.avatarBorder}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <Image
                style={styles.avatar}
                source={{ uri: this.props.user.avatar }}
              />
            </LinearGradient>

            <View style={styles.username}>
              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                {this.props.user.username}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          onScroll={this.handleScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              colors={["#469976", "#72CE4E", "#489C74"]}
            />
          }
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.bio}>
              <Text style={{ textAlign: "center" }}>{this.props.user.bio}</Text>
            </View>

            <LinearGradient
              style={styles.status}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <View style={styles.element}>
                <Text style={styles.number}>{this.props.user.noPosts}</Text>
                <Text style={styles.text}>POSTS</Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.number}>-</Text>
                <Text style={styles.text}>FOLLOWER</Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.number}>-</Text>
                <Text style={styles.text}>FOLOWING</Text>
              </View>
            </LinearGradient>
          </View>
          {this.list(this.props.posts)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.profile.user,
    posts: state.profile.list,
    postsLoading: state.profile.postsLoading,
    profileLoading: state.profile.profileLoading,
    skip: state.profile.skip
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getProfile, getUserPosts }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  topbar: {
    width: screenWidth,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight + 10
  },
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarBorder: {
    height: 81,
    width: 81,
    borderRadius: 40,
    padding: 1
  },
  avatar: {
    flex: 1,
    borderRadius: 40,
    alignItems: "center"
  },
  username: {
    alignItems: "center",
    marginBottom: 10
  },
  topButton: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bio: {
    justifyContent: "center",
    width: (screenWidth * 8) / 10,
    alignItems: "center",
    marginBottom: 10
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    height: 50,
    margin: 5,
    borderColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2
  },
  delete: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  status: {
    height: 70,
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  element: {
    width: screenWidth / 3,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 10
  },
  number: {
    color: "white",
    fontSize: 30
  }
});
