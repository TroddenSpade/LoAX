import React from 'react'
import { View,Text,Dimensions,StyleSheet,TouchableOpacity } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';

import LocationComponent from './locationComponent';
import Feed from './feed';
import { report } from '../../../utils/misc';

var height = Dimensions.get('window').height;

class Parallax extends React.Component{
    state={
        modalVisible:false,
        modalId:null,
        isReport:false,
    }

    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        
        return(
            <ParallaxScrollView
            backgroundColor="white"
            contentBackgroundColor="white"
            parallaxHeaderHeight={height - 70}
            renderForeground={() => (
                <LocationComponent location={data.region}/>
            )}>
                <View style={styles.container}>
                    <Feed posts={data} user={this.props.data}
                    profileHandler={()=>this.props.navigation.navigate('Profile',{data:data.userid})}
                    tagHandler={(tag)=>this.props.navigation.navigate('Search',{tag:tag})}
                    modalHandler={()=>this.setState({modalVisible:true,modalId:data.id})}/>
                    <DropdownAlert defaultContainer={{paddingTop: 20,padding: 5}} ref={ref => this.dropdown = ref} />
                    <Modal
                    isVisible={this.state.modalVisible}
                    transparent={true}
                    onBackButtonPress={()=>this.setState({modalVisible:false,isReport:false})}
                    onBackdropPress={()=>this.setState({modalVisible:false,isReport:false})}>
                        {this.state.isReport ? 
                        <View style={styles.modalContent}>
                        <TouchableOpacity
                        style={styles.goback}
                        onPress={()=>this.setState({isReport:false})}>
                        <Text style={{fontSize:15,color:'lightgreen'}}><AntDesign name="back" size={15} color='lightgreen'/>GoBack</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.reports}
                        onPress={()=>{
                        report(this.state.modalId,'WRONG_LOCATION',this.props.data,
                        ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
                        (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
                        this.setState({isReport:false,modalVisible:false})}
                        }><Text>Wrong Location</Text></TouchableOpacity>
                        <TouchableOpacity
                        style={styles.reports}
                        onPress={()=>{
                        report(this.state.modalId,'UNRELATED_PICTURE',this.props.data,
                        ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
                        (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
                        this.setState({isReport:false,modalVisible:false})}
                        }><Text>Unrelated Picture</Text></TouchableOpacity>
                        <TouchableOpacity
                        style={styles.reports}
                        onPress={()=>{
                        report(this.state.modalId,'ADVERTISMENT',this.props.data,
                        ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
                        (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
                        this.setState({isReport:false,modalVisible:false})}
                        }><Text>Advertisment</Text></TouchableOpacity>
                        <TouchableOpacity
                        style={styles.reports}
                        onPress={()=>{
                        report(this.state.modalId,'VIOLENCE',this.props.data,
                        ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
                        (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
                        this.setState({isReport:false,modalVisible:false})}
                        }><Text>Violence</Text></TouchableOpacity>
                        <TouchableOpacity
                        style={styles.reports}
                        onPress={()=>{
                        report(this.state.modalId,'NUDITY_PORNOGRAPHY',this.props.data,
                        ()=>this.dropdown.alertWithType('success', 'successfully done!', 'We\'ll get to that! ;)'),
                        (e)=>this.dropdown.alertWithType('error', 'Error', `error has been occurred :( \n${e} `));
                        this.setState({isReport:false,modalVisible:false})}
                        }><Text>Nudity & Pornography</Text></TouchableOpacity>
                        </View>
                        :
                        <View style={styles.modalContent}>
                        <TouchableOpacity onPress={()=>alert("it's not available right now !")} style={styles.reports}>
                            <Text>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({isReport:true})} style={styles.reports}>
                            <Text>Report</Text>
                        </TouchableOpacity>
                        </View>}
                    </Modal>
                </View>
            </ParallaxScrollView>
        )
    }
}

mapStateToProps=(state)=>{
    return{
        data:state.login.userData,
    }
}

export default connect(mapStateToProps,null)(Parallax);

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 128, 0, 0.1)',
      },
      reports:{
        height:50,
        width: '100%',
        margin: 5,
        borderColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
      },
      goback:{
        height:30,
        width: '50%',
        margin: 5,
        borderColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
      }
});