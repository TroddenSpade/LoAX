import axios from 'axios';

const FireBase=`https://loax-70d8e.firebaseio.com`;

export const getPosts=()=>{
    // if(tag==null){
    //     let URL = `${FireBase}/post.json`;
    // }else{
    //     let URL =`${FireBase}`;
    // }
    
    return async (dispatch , getState)=>{
        let URL = `https://loax-70d8e.firebaseio.com/post.json`;
        let posts=[];
        dispatch({type:'START_LOADING'});
        await axios(URL).then(
        async (response)=>{
            for(let key in response.data){
                let URL = `https://loax-70d8e.firebaseio.com/user/${response.data[key].userid}.json`
                await axios(URL)
                .then(async (response2) => {
                    posts.push({
                        ...response.data[key],
                        "username":response2.data.username,
                        "avatar":response2.data.pic,
                    })
                    // response.data[key].username =  response2.data.username;
                    // response.data[key].avatar =  response2.data.pic;
                    return response2;
                })
            }
            return posts;
        }).then((response)=>dispatch({type:'POSTS_SUCCESS',payload:response}))
        .catch((e)=>dispatch({type:'POSTS_ERROR',error:e}))
    }
}