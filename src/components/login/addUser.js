import axios from 'axios';

const FireBaseUser=`https://loax-70d8e.firebaseio.com/user`;

export const addUser=(state,store)=>{
    request = axios({
        method: 'PUT',
        url: `${FireBaseUser}/${state.username}.json?auth=${store.token}`,
        data: {
            username:state.username,
            email:state.email,
            userid:store.userid,
            refreshToken:store.refreshToken,
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(()=>console.log(request))
}