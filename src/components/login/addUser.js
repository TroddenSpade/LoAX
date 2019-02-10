import axios from 'axios';

const FireBaseUser=`https://loax-70d8e.firebaseio.com/user`;

export const addUser=(state,store)=>{
    request = axios({
        method: 'PUT',
        url: `${FireBaseUser}/${store.userid}.json?auth=${store.token}`,
        data: {
            email:state.email,
            userid:store.userid,
            refreshToken:store.refreshToken,
            username:state.username,
            "pic":"",
            "bio":""
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(()=>console.log(request))
}