import axios from 'axios';
import * as firebase from 'firebase';

import { FireBaseUser } from '../../utils/links';

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