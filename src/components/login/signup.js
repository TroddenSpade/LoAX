import React from 'react';
import { View , Text , Button , TextInput ,StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {registerUser} from '../../redux/action/login';
import {addUser} from './addUser';

class Signup extends React.Component{
    state={
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    }

    changeUserHandler = (username)=>{
        this.setState({
            username,
        })
    }

    changeEmailHandler = (email)=>{
        this.setState({
            email,
        })
    }

    changePassHandler = (password)=>{
        this.setState({
            password,
        })

    }

    changeConfirmHandler=(confirmPassword)=>{
        this.setState({
            confirmPassword,
        })
    }

    doAction = ()=>{
        this.props.registerUser(this.state)
        .catch( (e)=>{
            console.log(e);
            alert("cannot Sign up");
        })
    }

    render(){
        if(this.props.newUser){
            if(this.props.newUser.userid)   
                addUser(this.state,this.props.newUser);
        }
        return(
            <View style={styles.container}>

                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="username"
                        onChangeText={this.changeUserHandler}
                    />
                </View>

                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        onChangeText={this.changeEmailHandler}
                    />
                </View>
                
                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={this.changePassHandler}
                        secureTextEntry
                    />
                </View>
                
                <View style={styles.block}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        onChangeText={this.changeConfirmHandler}
                        secureTextEntry
                    />
                </View>

                <Button
                    title="SignUp"
                    onPress={this.doAction}
                />
                
            </View>

        )
    }
}

const mapStateToProps =(state)=>{
    return{
        newUser:state.login.newUser,
    }
}

const mapDispatchToProsp =(dispatch)=>{
    return bindActionCreators({registerUser, },dispatch);
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