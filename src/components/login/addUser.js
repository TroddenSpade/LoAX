import axios from 'axios';
import { FireBaseUser,uiAvatar } from '../../utils/links';

export const addUser=(state,store)=>{
    console.log(store);
    axios({
        method: 'PUT',
        url: `${FireBaseUser}/${store.localId}.json?auth=${store.idToken}`,
        data: {
            email:state.email,
            userid:store.localId,
            username:state.username,
            "pic":`${uiAvatar}${state.username}`,
            "bio":""
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).catch(e=>console.log(e.response))
}