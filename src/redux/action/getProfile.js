import axios from 'axios';

import { GET_USER_POSTS,GET_USER_DATA } from '../../utils/links';

export const getProfile =(userid)=>{
    return (dispatch,getState)=>{
        dispatch({type:'USER_DATA_LOADING'});
        axios.get(`${GET_USER_DATA}?userid=${userid}`)
        .then(response=>dispatch({type:'USER_SUCCESS',payload:response.data}))
        .catch(err=>dispatch({type:"MY_POSTS_ERROR",payload:err}));
    }
}

export const getUserPosts =(userid,skip,key,cb)=>{
    return (dispatch,getState)=>{
        if(key==0)  dispatch({type:'START_LOADING_USER_POSTS'});
        axios.get(`${GET_USER_POSTS}?userid=${userid}&skip=${skip}&limit=5&order=desc`)
        .then(response=>{
            if(key == 1 || key == 0){ //REFRESH
                dispatch({type:'USER_POSTS_REFRESH',payload:response.data,skip:skip+5});                
            }else{
                dispatch({type:'USER_POSTS_SUCCESS',payload:response.data,skip:skip+5});
            }
            cb();
        })
        .catch(err=>dispatch({type:"MY_POSTS_ERROR",payload:err}));
    }
}