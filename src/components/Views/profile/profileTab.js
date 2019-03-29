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
import { MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import DropdownAlert from "react-native-dropdownalert";
import Modal from "react-native-modal";

import { deletePost, getMyPosts } from "../../../redux/action/getMyProfile";
import { removeToken, getTokens } from "../../../utils/misc";
import ProfileList from "./profileList";
import Loading from "../../screens/loading";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Profile extends React.Component {
  state = {
    modalVisible: false,
    isDelete: false,
    modalId: null,
    modalkey: null,
    loadposts: false,
    scrollY: 0,
    refreshing: false
  };

  list = data => {
    return data.map((item, id) => (
      <ProfileList
        key={id}
        data={item}
        postHandler={() =>
          this.props.navigation.navigate("Parallax", {
            data: Object.assign({}, item, {
              user_data: {
                username: this.props.myData.username,
                avatar: this.props.myData.avatar
              }
            })
          })
        }
        modalHandler={() =>
          this.setState({ modalVisible: true, modalId: item._id, modalkey: id })
        }
      />
    ));
  };

  deletePost = () => {
    this.props.deletePost(
      this.state.modalId,
      this.state.modalkey,
      this.props.myData._id,
      () =>
        this.dropdown.alertWithType(
          "success",
          "Successfully Deleted",
          "Your Post has been Removed ;)"
        ),
      e =>
        this.dropdown.alertWithType(
          "error",
          "Error",
          `error has been occurred :( \n${e} `
        )
    );
    this.setState({
      modalVisible: false,
      isDelete: false,
      modalId: null,
      modalkey: null
    });
  };

  handleScroll = event => {
    if (
      event.nativeEvent.contentOffset.y >= this.state.scrollY &&
      !this.state.loadposts &&
      this.props.skip != undefined
    ) {
      this.setState({ loadposts: true });
      this.props.getMyPosts(this.props.myData._id, this.props.skip, -1, () => {
        this.setState({
          loadposts: false,
          scrollY: this.state.scrollY + 150
        });
      });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getMyPosts(this.props.myData._id, 0, 1, () => {
      this.setState({ refreshing: false, scrollY: 0 });
    });
  };

  render() {
    if (this.props.loading) return <Loading />;
    return (
      <View style={styles.container}>
        <DropdownAlert
          defaultContainer={{ paddingTop: 20, padding: 5 }}
          ref={ref => (this.dropdown = ref)}
        />
        <Modal
          isVisible={this.state.modalVisible}
          transparent={true}
          onBackButtonPress={() =>
            this.setState({ modalVisible: false, isDelete: false })
          }
          onBackdropPress={() =>
            this.setState({ modalVisible: false, isDelete: false })
          }
        >
          {this.state.isDelete ? (
            <View style={styles.modalContent}>
              <Text>Are You Sure !??</Text>
              <View style={styles.delete}>
                <LinearGradient
                  style={styles.buttonBorder}
                  colors={["#79CB52", "#225377"]}
                  start={[1, 0]}
                  end={[0, 0]}
                >
                  <TouchableOpacity
                    onPress={this.deletePost}
                    style={styles.modalButton}
                  >
                    <Text style={{color:"#225377"}}>Yes</Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  style={styles.buttonBorder}
                  colors={["#79CB52", "#225377"]}
                  start={[1, 0]}
                  end={[0, 0]}
                >
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => this.setState({ isDelete: false })}
                  >
                    <Text style={{color:"#225377"}}>No</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <LinearGradient
                style={styles.modalBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  onPress={() => alert("it's not available right now !")}
                  style={styles.modalButton}
                >
                  <Text>Update</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.modalBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => this.setState({ isDelete: true })}
                >
                  <Text>Remove</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </Modal>

        <LinearGradient
          style={styles.statusBar}
          colors={["#79CB52", "#225377"]}
          start={[1, 0]}
          end={[0, 0]}
        />
        <View style={styles.topbar}>
          <View style={styles.topButton}>
            <TouchableOpacity
              onPress={() =>
                removeToken(() => this.props.navigation.navigate("Login"))
              }
            >
              <Octicons name="sign-out" color={"#225377"} size={30} />
            </TouchableOpacity>
            <View style={{ width: screenWidth / 3 }} />
            <View style={{ width: screenWidth / 3 }} />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Settings", {
                  successHandler: () =>
                    this.dropdown.alertWithType(
                      "success",
                      "successfully updated",
                      "All changes have been done ;) "
                    ),
                  errorHandler: e =>
                    this.dropdown.alertWithType(
                      "error",
                      "Error",
                      `error has been occurred :( \n${e} `
                    )
                })
              }
            >
              <MaterialCommunityIcons
                name="settings"
                color={"#79CB52"}
                size={30}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.profile}>
            <LinearGradient
              style={styles.avatarBorder}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <Image
                style={styles.avatar}
                source={{ uri: this.props.myData.avatar }}
              />
            </LinearGradient>

            <View style={styles.username}>
              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                {this.props.myData.username}
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
            {this.props.myData.bio.length == 0 ? (
              <TouchableOpacity
                style={styles.bio}
                onPress={() =>
                  this.props.navigation.navigate("Settings", {
                    successHandler: () =>
                      this.dropdown.alertWithType(
                        "success",
                        "successfully updated",
                        "All changes have been done ;) "
                      ),
                    errorHandler: e =>
                      this.dropdown.alertWithType(
                        "error",
                        "Error",
                        `error has been occurred :( \n${e} `
                      )
                  })
                }
              >
                <Text style={{ fontSize: 20, color: "lightgrey" }}>
                  Add Bio
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.bio}>
                <Text style={{ textAlign: "center" }}>
                  {this.props.myData.bio}
                </Text>
              </View>
            )}

            <LinearGradient
              style={styles.status}
              colors={["#79CB52", "#225377"]}
              start={[1, 0]}
              end={[0, 0]}
            >
              <View style={styles.element}>
                <Text style={styles.number}>{this.props.myData.noPosts}</Text>
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
          {this.props.myposts.length == 0 ? (
            <TouchableOpacity
              style={styles.postScreen}
              onPress={() =>
                this.props.navigation.navigate("AddPost", {
                  successHandler: () =>
                    this.dropdown.alertWithType(
                      "success",
                      "successfully updated",
                      "All changes have been done ;) "
                    ),
                  errorHandler: e =>
                    this.dropdown.alertWithType(
                      "error",
                      "Error",
                      `error has been occurred :( \n${e} `
                    )
                })
              }
            >
              <Ionicons name="md-images" color={"lightgrey"} size={100} />
              <Text
                style={{
                  fontSize: 20,
                  color: "lightgrey"
                }}
              >
                Add Post !
              </Text>
            </TouchableOpacity>
          ) : (
            this.list(this.props.myposts)
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myposts: state.myProfile.list,
    skip: state.myProfile.skip,
    loading: state.myProfile.loading,
    myData: state.login.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyPosts, deletePost }, dispatch);
}

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
    marginTop: 10
  },
  statusBar: {
    height: Constants.statusBarHeight
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalBorder: {
    height: 50,
    width: '80%',
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 2,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 11,
  },
  buttonBorder: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    margin: 5,
    padding: 2,
    borderRadius: 11,

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
  },
  postScreen: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
