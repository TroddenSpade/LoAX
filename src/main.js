import React from 'react';
import {connect} from 'react-redux';

import Views from './components/Views';
import Login from './components/login';
import { setTokens , getTokens } from './utils/misc';

class Main extends React.Component{
    render(){
        if(!this.props.login.userData)
            return <Login/>
        if(this.props.login.userData.userid){
            setTokens(this.props.login.userData,()=>{ console.log("itworks!") });
            // getTokens((data)=>console.log(data));
            return <Views/>
        }else{
            alert("Email or Password is Wrong");
            return <Login/>
        }
    }
}

const mapStateToProps=(store)=>{
    console.log(store)
    return{
        login:store.login
    }
}

export default connect(mapStateToProps)(Main);