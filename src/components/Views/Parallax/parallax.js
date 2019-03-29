import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { Constants,LinearGradient } from "expo";

import LocationComponent from "./locationComponent";
import Feed from "./feed";
import { report } from "../../../utils/misc";

var height = Dimensions.get("window").height;

class Parallax extends React.Component {
  state = {
    modalVisible: false,
    modalId: null,
    isReport: false,
    y: 0
  };

  scrollHandler = event => {
    this.setState({ y: event.nativeEvent.contentOffset.y });
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");
    return (
      <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={height - 40 - Constants.statusBarHeight}
        scrollEvent={this.scrollHandler}
        renderForeground={() => <LocationComponent location={data.region} />}
      >
        <View style={styles.container}>
          <Feed
            post={data}
            scrollEvent={this.state.y}
            profileHandler={() => {
              if (data.user_data._id == this.props.userid)
                this.props.navigation.navigate("profile");
              else
                this.props.navigation.navigate("Profile", {
                  data: data.user_data._id
                });
            }}
            tagHandler={tag =>
              this.props.navigation.navigate("Search", { tag: tag })
            }
            modalHandler={() =>
              this.setState({ modalVisible: true, modalId: data._id })
            }
          />
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
      </ParallaxScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    userid: state.login.user._id
  };
};

export default connect(
  mapStateToProps,
  null
)(Parallax);

const styles = StyleSheet.create({
  container: {
    flex: 1
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