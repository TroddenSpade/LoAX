import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { REPORT } from './links';

export const setTokens =(data)=>{
    AsyncStorage.multiSet([
        ['@LoAX@token',data.token],
        ['@LoAX@id',data._id]
    ]).then(()=>console.log("Token Has Been Set"));
}

export const getTokens=(scb,fcb)=>{
    AsyncStorage.multiGet([
        '@LoAX@token',
        '@LoAX@id'
    ]).then(response => scb(response))
    .catch(err=>fcb(err));
}

export const removeToken =(CBfunction)=>{
    AsyncStorage.multiRemove([
        '@LoAX@token',
        '@LoAX@id'
    ]).then(()=>CBfunction());
}

export const report =(postid,type,userid,successHandler,errorHandler)=>{
    axios.post(REPORT,{
        post_id:postid,
        user_id:userid,
        type
    })
    .then(res=>{
        if(res.data.report){
            successHandler();
        }else{
            errorHandler(res.data.error);
        }
    })
    .catch((e)=>errorHandler(e));
}