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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Feather, AntDesign } from "@expo/vector-icons";
import DropdownAlert from "react-native-dropdownalert";
import Modal from "react-native-modal";
import { LinearGradient, Font, Constants } from "expo";

import Loading from "../../screens/loading";
import { getPosts } from "../../../redux/action/getPosts";
import { getMyPosts } from "../../../redux/action/getMyProfile";
import { report } from "../../../utils/misc";

import List from "./postsList";

class Home extends React.Component {
  state = {
    loadposts: false,
    scrollY: 0,
    refreshing: false,
    modalVisible: false,
    modalId: null,
    isReport: false,
    fontLoaded: false
  };

  componentWillMount() {
    this.props.getPosts();
    this.props.getMyPosts(this.props.userid, 0, 0, () => {});
  }

  async componentDidMount() {
    await Font.loadAsync({
      Sacramento: require("../../../../assets/fonts/Sacramento-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  list = () =>
    this.props.list.map((item, id) => (
      <List
        key={id}
        post={item}
        locationHandler={() =>
          this.props.navigation.navigate("Parallax", { data: item })
        }
        profileHandler={() => {
          if (item.user_data._id === this.props.userid)
            this.props.navigation.navigate("profile");
          else
            this.props.navigation.navigate("Profile", {
              data: item.user_data._id
            });
        }}
        tagHandler={tag =>
          this.props.navigation.navigate("Search", { tag: tag })
        }
        modalHandler={() =>
          this.setState({ modalVisible: true, modalId: item._id })
        }
      />
    ));

  handleScroll = event => {
    if (
      event.nativeEvent.contentOffset.y >= this.state.scrollY &&
      !this.state.loadposts &&
      this.props.skip != undefined
    ) {
      this.setState({ loadposts: true });
      this.props.getPosts(this.props.skip, -1, () => {
        this.setState({
          loadposts: false,
          scrollY: this.state.scrollY + 2000
        });
      });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPosts(0, 1, () => {
      this.setState({ refreshing: false, scrollY: 0 });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <DropdownAlert
          defaultContainer={{ paddingTop: 20, padding: 5 }}
          ref={ref => (this.dropdown = ref)}
        />

        <Modal
          isVisible={this.state.modalVisible}
          transparent={true}
          onBackButtonPress={() =>
            this.setState({ modalVisible: false, isReport: false })
          }
          onBackdropPress={() =>
            this.setState({ modalVisible: false, isReport: false })
          }
        >
          {this.state.isReport ? (
            <View style={styles.modalContent}>
              <LinearGradient
                style={styles.goBackBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.goback}
                  onPress={() => this.setState({ isReport: false })}
                >
                  <Text style={{ fontSize: 15, color: "white" }}>
                    <AntDesign name="back" size={15} color="white" />
                     Go Back
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.reports}
                  onPress={() => {
                    report(
                      this.state.modalId,
                      "WRONG_LOCATION",
                      this.props.data,
                      () =>
                        this.dropdown.alertWithType(
                          "success",
                          "successfully done!",
                          "We'll get to that! ;)"
                        ),
                      e =>
                        this.dropdown.alertWithType(
                          "error",
                          "Error",
                          `error has been occurred :( \n${e} `
                        )
                    );
                    this.setState({ isReport: false, modalVisible: false });
                  }}
                >
                  <Text>Wrong Location</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.reports}
                  onPress={() => {
                    report(
                      this.state.modalId,
                      "UNRELATED_PICTURE",
                      this.props.data,
                      () =>
                        this.dropdown.alertWithType(
                          "success",
                          "successfully done!",
                          "We'll get to that! ;)"
                        ),
                      e =>
                        this.dropdown.alertWithType(
                          "error",
                          "Error",
                          `error has been occurred :( \n${e} `
                        )
                    );
                    this.setState({ isReport: false, modalVisible: false });
                  }}
                >
                  <Text>Unrelated Picture</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.reports}
                  onPress={() => {
                    report(
                      this.state.modalId,
                      "ADVERTISMENT",
                      this.props.data,
                      () =>
                        this.dropdown.alertWithType(
                          "success",
                          "successfully done!",
                          "We'll get to that! ;)"
                        ),
                      e =>
                        this.dropdown.alertWithType(
                          "error",
                          "Error",
                          `error has been occurred :( \n${e} `
                        )
                    );
                    this.setState({ isReport: false, modalVisible: false });
                  }}
                >
                  <Text>Advertisment</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.reports}
                  onPress={() => {
                    report(
                      this.state.modalId,
                      "VIOLENCE",
                      this.props.data,
                      () =>
                        this.dropdown.alertWithType(
                          "success",
                          "successfully done!",
                          "We'll get to that! ;)"
                        ),
                      e =>
                        this.dropdown.alertWithType(
                          "error",
                          "Error",
                          `error has been occurred :( \n${e} `
                        )
                    );
                    this.setState({ isReport: false, modalVisible: false });
                  }}
                >
                  <Text>Violence</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  style={styles.reports}
                  onPress={() => {
                    report(
                      this.state.modalId,
                      "NUDITY",
                      this.props.data,
                      () =>
                        this.dropdown.alertWithType(
                          "success",
                          "successfully done!",
                          "We'll get to that! ;)"
                        ),
                      e =>
                        this.dropdown.alertWithType(
                          "error",
                          "Error",
                          `error has been occurred :( \n${e} `
                        )
                    );
                    this.setState({ isReport: false, modalVisible: false });
                  }}
                >
                  <Text>Nudity</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  onPress={() => alert("it's not available right now !")}
                  style={styles.reports}
                >
                  <Text>Share</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                style={styles.reportBorder}
                colors={["#79CB52", "#225377"]}
                start={[1, 0]}
                end={[0, 0]}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ isReport: true })}
                  style={styles.reports}
                >
                  <Text>Report</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </Modal>

        <LinearGradient
          style={styles.topBar}
          colors={["#79CB52", "#225377"]}
          start={[1, 0]}
          end={[0, 0]}
        >
          <TouchableOpacity
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
            <Feather name="camera" color={"white"} size={25} />
          </TouchableOpacity>

          <View>
            {this.state.fontLoaded ? (
              <Text style={styles.logoText}>
                l
                <Image
                  style={styles.logo}
                  source={require("../../../utils/LoAX.png")}
                />
                ax
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
          >
            <AntDesign name="search1" color={"white"} size={25} />
          </TouchableOpacity>
        </LinearGradient>

        {this.props.isLoading ? (
          <Loading />
        ) : (
          <ScrollView
            onScroll={this.handleScroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                colors={["#79CB52", "#225377"]}
              />
            }
          >
            {this.list()}
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.posts.list,
    isLoading: state.posts.loading,
    skip: state.posts.skip,
    userid: state.login.user._id,
    data: state.login.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPosts, getMyPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  logo: {
    width: 22,
    height: 22,
    marginLeft: 3
  },
  logoText: {
    marginTop: 8,
    fontSize: 40,
    color: "white",
    fontFamily: "Sacramento"
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    width: "100%",
    paddingTop: Constants.statusBarHeight
  },
  modalContent: {
    backgroundColor: "white",
    padding: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  reports: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white"
  },
  reportBorder: {
    height: 50,
    width: "80%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderRadius: 11
  },
  goback: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  goBackBorder: {
    height: 30,
    width: "50%",
    padding: 2,
    margin: 5,
    borderRadius: 11
  }
});