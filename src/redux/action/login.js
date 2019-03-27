import axios from 'axios';

import { USER_UPDATE,SIGN_UP,SIGN_IN,CHECK_TOKEN,uiAvatar } from '../../utils/links';

export const registerUser =(data)=>{
    const request = axios.post(SIGN_UP,data)
    .then(response =>response.data)
    .catch(err=>console.log(err))
    return{
        type:"USER_REGISTERED",
        payload:request,
    }
}

export const signinUser=(data)=>{
    const request = 
    axios.post(SIGN_IN,data)
    .then(response=>response.data)
    return{
        type:"USER_SIGN_IN",
        payload:request
    }
}

export const checkToken=(value)=>{
    const request = axios.post(CHECK_TOKEN,{id:value[1][1],token:value[0][1]})
    .then(response=>response.data)
    .catch(err=>console.log(err))
    return{
        type:"CHECK_TOKEN",
        payload:request,
    }
}

export const updateUser =(data,userid,scb,fcb)=>{
    return (dispatch,getState)=>{
        axios.post(`${USER_UPDATE}?userid=${userid}`,data)
        .then((res)=>{
            if(res.data.update){
                scb();
                dispatch({type:'USER_UPDATED',payload:res.data.user});
            }else{
                fcb(res.data.err);
            }
            return res;
        })
        .catch((e)=>{
            dispatch({type:'USER_UPDATE_ERROR'});
            fcb(e);
        });
    }
}