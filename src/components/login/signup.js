import React from 'react';
import { View , Text , Button , TextInput ,StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {registerUser} from '../../redux/action/login';

class Signup extends React.Component{
    state={
        email:'',
        password:'',
        confirmPassword:'',
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

    changeConfirmHandler=(confirmPassword)=>{
        this.setState({
            confirmPassword,
        })
    }

    doAction = ()=>{
        this.props.registerUser(this.state)
        .then(()=>this.props.navigation.navigate('signIn'))
        .catch( (e)=>{
            console.log(e);
            alert("cannot Sign up");
        })
        
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
        login:state,
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