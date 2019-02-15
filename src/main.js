import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Views from './components/Views';
import Login from './components/login';
import Loading from './components/screens/loading';
import { setTokens , getTokens } from './utils/misc';
import {exchangeToken} from './redux/action/login';

class Main extends React.Component{
    state={
        loading:true,
        login:true,
    }

    componentWillMount(){
        getTokens((value)=>{
            if(value[0][1]== null)  this.setState({loading:false})
            else{
                this.props.exchangeToken(value[1][1])
                .then( ()=>{ this.setState({loading:false,login:false}) })
                .catch((e)=>{ if(e!=null) this.setState({loading:false}) })
            }
        });
    }

    render(){
        if(this.state.loading)  return(<Loading/>)
        if(this.props.login.userData){
            if(this.props.login.userData.userid){
                setTokens(this.props.login.userData,()=>{ console.log("itworks!") });
                return <Views/>
            }
        }
        if(this.state.login){
            return <Login/>
        }
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

export default connect(mapStateToProps,mapDispatchToProsp)(Main);