import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { Login } from './components/login';
import { Views } from './components/Views';

import Loading from './components/screens/loading';
import { getTokens } from './utils/misc';
import {exchangeToken} from './redux/action/login';

class Main extends React.Component{
    state={
        login:null,
    }

    componentWillMount(){
        getTokens((value)=>{
            if(value[0][1] == null)  this.setState({login:true})
            else{
                console.log(value)
                this.props.exchangeToken(value[1][1])
                .then(()=>{this.setState({login:false})})
                .catch(e=>{this.setState({login:false})})
            }
        });
    }

    componentDidUpdate(){
        if(this.state.login == true){
            this.props.navigation.navigate('Login')

        }else if(this.state.login == false){
            this.props.navigation.navigate('Views')
        }
    }

    render(){
        return <Loading/>
    }
}

const mapStateToProps=(store)=>{
    return{
        login:store.login
    }
}

const mapDispatchToProsp=(dispatch)=>{
    return bindActionCreators({exchangeToken},dispatch);
}

const ConnectMainToRedux = connect(mapStateToProps,mapDispatchToProsp)(Main);

const RootNavigation = createSwitchNavigator({
    Main:{
        screen:ConnectMainToRedux,
    },
    Views:{
      screen:Views,
    },
    Login:{
      screen:Login,
    }
  },{
    initialRouteName: 'Main',
});

export default AppContainer = createAppContainer(RootNavigation);