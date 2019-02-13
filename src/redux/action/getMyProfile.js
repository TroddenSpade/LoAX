import axios from 'axios';


export const getMyPosts =(userid)=>{
    const URL = `https://loax-70d8e.firebaseio.com/post.json/?orderBy=\"userid\"&equalTo=\"${userid}\"`
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
    const URL = `https://loax-70d8e.firebaseio.com/user/${userid}.json`;
    const request = axios(URL).then(response => response.data);

    return{
        type:"MY_DATA_SUCCESSFUL",
        payload:request
    }
}