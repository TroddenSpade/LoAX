import axios from 'axios';

import { ADD_POST } from '../../utils/links';

export const post = (data,scb,fcb)=>{
    
    return (dispatch,getState)=>{
        axios({
            method: 'post',
            url: ADD_POST,
            data: data,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        })
        .then(res=>{
            if(res.data.post_success){
                scb();
                var post = Object.assign({},res.data.post,{
                    user_data:{
                        username:getState().login.user.username,
                        avatar:getState().login.user.avatar
                    }
                })
                dispatch({type:'POST_ADDED',payload:post})
            }else{
                fcb(res.data.err);
            }
            return res;

        }).catch(err=>{
            fcb(err)
            dispatch({type:'POST_ADD_ERROR'})
            return err;
        });

    }
}