import axios from 'axios';

export const getProfile =(userid)=>{
    const URLPOSTS = `https://loax-70d8e.firebaseio.com/post.json/?orderBy=\"userid\"&equalTo=\"${userid}\"`
    const URLPROFILE = `https://loax-70d8e.firebaseio.com/user/${userid}.json`;

    return (dispatch,getstate)=>{
        dispatch({type:"PROFILE_LOADING_START"});

        const requestProfile = axios(URLPROFILE).then(response => {return response.data});
        dispatch({type:'PROFILE_SUCCESSFUL',payload:requestProfile});

        const requestPosts = axios(URLPOSTS)
        .then(response => {
            let posts=[];
            
            for(let key in response.data){
                posts.push({
                    ...response.data[key],
                })
            }
            return posts
        });
        dispatch({type:'POSTS_SUCCESSFUL',payload:requestPosts});
    }

}