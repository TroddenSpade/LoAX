import axios from 'axios';

const FireBaseUser=`https://loax-70d8e.firebaseio.com/user.json`;

export const addUser =(state,store)=>{
    
    axios({
        method:"POST",
        url:`${FireBaseUser}?auth=${store.token}`,
        data:{
            username:state.username,
            email:state.email,
            userid:store.userid,
            refreshToken:store.refreshToken,
        }
    }).then(response => response.data)
        .catch(e=>{console.log(e)})
}