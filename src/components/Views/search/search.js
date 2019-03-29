import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Font, LinearGradient } from "expo";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import DropdownAlert from "react-native-dropdownalert";
import Modal from "react-native-modal";

import Loading from "../../screens/loading";
import List from "./searchList";
import { search } from "../../../redux/action/search";
import { report } from "../../../utils/misc";

const screenWidth = Dimensions.get("window").width;

class Search extends React.Component {
  state = {
    input: "",
    tag: "",
    loading: null,
    loadposts: false,
    scrollY: 0,
    refreshing: false,
    modalVisible: false,
    modalId: null,
    isReport: false,
    fontLoaded: false
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const tag = navigation.getParam("tag");
    if (tag != undefined) {
      await this.setState({ input: tag });
      this.search();
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("../../../../assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  changePassHandler = input => {
    this.setState({ input });
  };

  list = () =>
    this.props.posts.map((item, id) => (
      <List
        key={id}
        post={item}
        locationHandler={() =>
          this.props.navigation.navigate("Parallax", { data: item })
        }
        profileHandler={() => {
          if (item.user_data._id == this.props.userid)
            this.props.navigation.navigate("profile");
          else
            this.props.navigation.navigate("Profile", {
              data: item.user_data._id
            });
        }}
        tagHandler={tag => {
          this.setState({ input: tag });
          this.search();
        }}
        modalHandler={() =>
          this.setState({ modalVisible: true, modalId: item._id })
        }
      />
    ));

  handleScroll = event => {
    if (
      event.nativeEvent.contentOffset.y > this.state.scrollY &&
      !this.state.loadposts &&
      this.props.skip != undefined
    ) {
      this.setState({ loadposts: true });
      this.props.search(this.state.tag, this.props.skip, -1, () => {
        this.setState({
          loadposts: false,
          scrollY: this.state.scrollY + 2000
        });
      });
    }
  };

  onRefresh = () => {
    const RELOAD = 1;
    this.setState({ refreshing: true });
    this.props.search(this.state.tag, 1, RELOAD, () => {
      this.setState({ refreshing: false, scrollY: 0 });
    });
  };

  search = () => {
    this.setState({ tag: this.state.input.trim().toLowerCase() });
    this.props.search(this.state.input.trim().toLowerCase(), 0, 0, () => {});
  };

  searchScreen = () => {
    if (this.props.loading == true) {
      return <Loading />;
    } else if (this.props.loading == false) {
      return (
        <ScrollView
          onScroll={this.handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              colors={["#79CB52", "#225377"]}
            />
          }
        >
          <View style={styles.blank} />
          {this.list()}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.searchScreen}>
          <MaterialCommunityIcons
            name="feature-search"
            color={"#469577"}
            size={100}
          />
          {this.state.fontLoaded ? (
            <Text
              style={{ fontSize: 20, color: "#469577", fontFamily: "Lobster" }}
            >
              Search For Tags !
            </Text>
          ) : null}
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.searchScreen()}

        <LinearGradient
          style={styles.searchBar}
          colors={["#79CB52", "#225377"]}
          start={[1, 0]}
          end={[0, 0]}
        >
          <View>
            <TextInput
              maxLength={25}
              style={styles.input}
              placeholder="Search"
              value={this.state.input}
              onChangeText={this.changePassHandler}
            />
          </View>

          <TouchableOpacity style={styles.search} onPress={this.search}>
            <AntDesign name="search1" color={"#225377"} size={25} />
          </TouchableOpacity>
        </LinearGradient>
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.search.list,
    loading: state.search.loading,
    userid: state.login.user._id,
    skip: state.search.skip
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ search }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  searchBar: {
    marginTop: 30,
    width: "90%",
    height: 40,
    borderColor: "#79CB52",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center"
  },
  input: {
    flex: 1,
    margin: 3,
    backgroundColor: "white",
    paddingLeft: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: (screenWidth * 9) / 10 - 35
  },
  search: {
    paddingRight: 5
  },
  searchScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  blank: {
    height: 75
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 128, 0, 0.1)"
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
