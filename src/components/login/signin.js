import React from 'react';
import {
    View
    ,Text
    ,Button
    ,CheckBox
    ,TextInput
    ,StyleSheet
    ,KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signinUser} from '../../redux/action/login';
import { setTokens } from '../../utils/misc';


class Signin extends React.Component{
    state={
        email:'',
        password:'',
        autoSignIn:false,
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

    doAction =()=>{
        this.props.signinUser(this.state)
        .then((response)=>{
            if(this.state.autoSignIn){
                setTokens(response.payload)
            }
            this.props.navigation.navigate('Views');
        })
        .catch(e=>alert(e))
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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

                <View style={styles.checkBox}>
                    <CheckBox value={this.state.autoSignIn} onValueChange={()=>this.setState({autoSignIn:!this.state.autoSignIn})}/>
                    <Text>auto sign-in</Text>
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
            </KeyboardAvoidingView>

        )
    }
}

const mapStateToProps =(state)=>{
    return{
        userData:state.login.userData
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
    checkBox:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
})