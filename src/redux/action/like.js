import axios from 'axios';

import { FireBasePost } from '../../utils/links';

export const like=(postData,userData,cb)=>{
    axios({
        method:"PUT",
        url:`${FireBasePost}/${postData.id}/like.json?auth=${userData.token}`,
        data:{
            likeCount:postData.like.likeCount+1,
            likers:Object.assign(postData.like.likers,{[userData.userid]:true})
        },
    }).then(cb)
    .catch(e=>console.log(e));
}

export const dislike =(postData,userData,cb)=>{
    axios({
        method:"DELETE",
        url:`${FireBasePost}/${postData.id}/like/likers/${userData.userid}.json?auth=${userData.token}`,
    }).then(()=>{
        axios({
            method:"PUT",
            url:`${FireBasePost}/${postData.id}/like.json?auth=${userData.token}`,
            data:{
                likers:Object.assign(postData.like.likers,{[userData.userid]:false}),
                likeCount:postData.like.likeCount-1
            },
        }).then(cb);
    })
    .catch(e=>console.log(e.response));
}