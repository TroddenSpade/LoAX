import axios from 'axios';

import { FireBaseUser,FireBasePost } from '../../utils/links';

export const getMyPosts =(userid)=>{
    const URL = `${FireBasePost}.json/?orderBy=\"userid\"&equalTo=\"${userid}\"`
    const request = axios(URL)
    .then(response => {
        let posts=[];

        for(let key in response.data){
            posts.push({
                ...response.data[key],
            })
        }
        return posts
    });

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