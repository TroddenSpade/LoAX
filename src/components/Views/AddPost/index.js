import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import AddLocation from './addLocation';
import AddPicture from './addPicture';

class AddPost extends React.Component{
    state={
        picture:null,
        location:{},
        disc:null,
    }

    locationHandler=(location)=>{
        this.setState({location});
    }

    render(){
        console.log(this.state.location)
        return(
            <View style={styles.container}>
                <Text>Add Post</Text>

                <TouchableOpacity style={styles.map} onPress={()=>this.props.navigation.navigate('AddLocation',{locationHandler:this.locationHandler})}>
                    <AddLocation locationHandler={this.locationHandler}/>
                </TouchableOpacity>

                <Text>Add comment</Text>    
            </View>
        )
    }
}

export default RootStack = createStackNavigator(
    {
      AddPost:{
        screen:AddPost,
      },
      AddLocation:{
        screen: AddLocation,
      },
      AddPicture:{
        screen : AddPicture,
      }
    },
    {
      initialRouteName: 'AddPost',
      headerMode:'none'
    }
  );

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    map:{
        height:100,
        width:"100%"
    }
})