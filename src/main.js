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

    componentDidMount(){
        getTokens((value)=>{
            if(value[0][1]== null)  this.setState({loading:false})
            else{
                this.props.exchangeToken(value[1][1]).then(
                    ()=>{ this.setState({loading:false,login:false}) })
            }
        });
    }

    render(){
        if(this.state.loading)  return(<Loading/>)
        console.log(this.props.login)
        if(this.props.login.userData){
            console.log(this.props.login.userData);
            if(this.props.login.userData.userid){
                setTokens(this.props.login.userData,()=>{ console.log("itworks!") });
                return <Views/>
            }else    
                console.log("invalid Sign In");
        }else{
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