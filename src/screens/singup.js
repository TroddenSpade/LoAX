import React from 'react';
import { View , Text , Button , TextInput ,StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {registerUser} from '../redux/action';

class Signup extends React.Component{
    state={
        email:'',
        password:''
    }

    changeUserHandler = (email)=>{
        this.setState({
            email,
        })
    }

    changePassHandler = (password)=>{
        this.setState({
            password,
        })

    }

    statechange = ()=>{
        this.props.registerUser(this.state)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        onChangeText={this.changeUserHandler}
                    />
                </View>
                
                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={this.changePassHandler}
                    />
                </View>

                <Button
                    title="SignUp"
                    onPress={this.statechange}
                />
                
            </View>

        )
    }
}

const mapStateToProps =(state)=>{
    console.log(state)
    return{
        articles:state.email
    }
}

const mapDispatchToProsp =(dispatch)=>{
    return bindActionCreators({registerUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProsp)(Signup)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    input:{
        borderWidth:1,
        borderColor: "#cecece",
        paddingLeft: 4,
        width: 300,
        height: 30,
    },
    block:{
        margin:10
    },
})