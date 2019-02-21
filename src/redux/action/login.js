import axios from 'axios';

import {addUser} from '../../components/login/addUser';
import { API,Register,Signin,Exchange } from '../../utils/links';

export const registerUser =(data)=>{
    const request = axios({
        method:"POST",
        url:`${Register}${API}`,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true,
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response =>{
        addUser(data,response.data);
        return response.data;
    } );

    return{
        type:"user_register",
        payload:request,
    }
}

export const signinUser=(data)=>{
    const request = axios({
        method:"POST",
        url:`${Signin}${API}`,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true,
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => response.data)
    .catch(e=>console.log(e));

    return{
        type:"user_signin",
        payload:request,
    }
}

export const exchangeToken=(refreshToken)=>{
    const request = axios({
        method:"POST",
        url:`${Exchange}${API}`,
        data:"grant_type=refresh_token&refresh_token="+refreshToken,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(response => response.data).catch(e=>console.log(e));


    return{
        type:"exchange_token",
        payload:request,
    }
}