import axios from 'axios';
import { GET_POSTS } from '../../utils/links';

export const getPosts=(skip=0,key,cb)=>{
    return (dispatch,getState)=>{
        if(key==0)  dispatch({type:'START_LOADING_POSTS'});
        axios.get(`${GET_POSTS}?skip=${skip}&limit=5&order=desc`)
        .then(response=>{
            if(key == 1){ //REFRESH
                dispatch({type:'REFRESH_POSTS',payload:response.data,skip:skip+5})
            }else{
                dispatch({type:'POSTS_SUCCESS',payload:response.data,skip:skip+5})
            }
            cb();
        })
        .catch(err=>dispatch({type:"POSTS_ERROR",payload:err}))
    }
}

export const post=(data,scb,fcb)=>{
    axios.post(URL,data)
    .then(scb)
    .catch((e)=>fcb(e.response.data.error));
}