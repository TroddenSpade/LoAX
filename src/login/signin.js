import React from 'react';
import { View , Text , Button , TextInput ,StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signinUser} from '../redux/action/login';
import { setTokens } from '../misc';

class Signin extends React.Component{
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

    doAction = ()=>{
        this.props.signinUser(this.state).then(
                        ()=>this.manageAccess());
    }

    manageAccess =()=>{
        if(!this.props.userData.userid){
            alert("Can not Sign in !");
        }
        setTokens(this.props.userData,()=>{console.log("it Works")});
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

                <Button
                    title="Sign In"
                    onPress={this.doAction}
                />
                <View>
                    <Text>If You don't have an account </Text>
                    <Button
                        title="Sign Up"
                        onPress={() => this.props.navigation.navigate('signUp')}
                    />
                </View>
            </View>

        )
    }
}

const mapStateToProps =(state)=>{
    console.log(state.Reducer)
    return{
        Reducer:state.Reducer,
    }
}

const mapDispatchToProsp =(dispatch)=>{
    return bindActionCreators({signinUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProsp)(Signin)

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