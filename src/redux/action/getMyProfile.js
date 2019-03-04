import axios from 'axios';
import * as firebase from 'firebase';

import { FireBaseUser, FireBasePost } from '../../utils/links';

export const getMyPosts =(userid)=>{
    const request = firebase.database().ref(`post`).orderByChild('userid').equalTo(userid)
    .once(`value`).then((snapshot)=>Object.values(snapshot.val()));
    return{
        type:"MY_POSTS_SUCCESSFUL",
        payload:request
    }
}

export const getMyData =(userid)=>{
    const URL = `${FireBaseUser}/${userid}.json`;
    const request = axios(URL).then(response => response.data);

    return{
        type:"MY_DATA_SUCCESSFUL",
        payload:request
    }
}

export const updateData =(newdata,avatarUrl,myData,token)=>{
    const URL = `${FireBaseUser}/${myData.userid}.json?auth=${token}`;
    const request = axios({
        method: 'PUT',
        url: URL,
        data:{
            pic:avatarUrl,
            name:newdata.name,
            bio:newdata.bio,
            email:myData.email,
            userid:myData.userid,
            username:myData.username
        }
    }).then((response)=>response.data)
    .catch((e)=>console.log(e.data));
    return{
        type:'MY_DATA_SUCCESSFUL',
        payload:request,
    }
}

export const deletePost=(postId,token,cb,cbError)=>{
    const URL = `${FireBasePost}/${postId}.json?auth=${token}`
    const request = axios({
        method:'DELETE',
        url:URL,
    }).then(cb)
    .catch(e=>cbError(e))
}