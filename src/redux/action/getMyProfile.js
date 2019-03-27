import axios from 'axios';

import { GET_MY_POSTS,UPDATE_USER,DELETE_POST } from '../../utils/links';

export const getMyPosts =(userid,skip=0,key,cb)=>{
    return (dispatch,getState)=>{
        if(key==0)  dispatch({type:'START_LOADING_MY_POSTS'});
        axios.get(`${GET_MY_POSTS}?userid=${userid}&skip=${skip}&limit=5&order=desc`)
        .then(response=>{
            if(key == -1){ //REFRESH
                dispatch({type:'MY_POSTS_SUCCESS',payload:response.data,skip:skip+5});
            }else{
                dispatch({type:'MY_POSTS_REFRESH',payload:response.data,skip:skip+5});                
            }
            cb();
        })
        .catch(err=>dispatch({type:"MY_POSTS_ERROR",payload:err}))
    }
}

export const updateData =(data,userid,scb,fcb)=>{
    
    return (dispatch,getState)=>{
        axios.post(`${UPDATE_USER}?id=${userid}`,data)
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

export const deletePost=(postId,postKey,scb,fcb)=>{
    return (dispatch,getState)=>{
        axios.delete(`${DELETE_POST}?id=${postId}`)
        .then(res=>{
            if(res.data.delete){
                scb();
                dispatch({type:'POST_DELETED',key:postKey})
            }else{
                fcb('error');
            }
        })
        .catch(e=>fcb(e));
    }
}