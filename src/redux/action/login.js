import axios from 'axios';
const API =`AIzaSyDt3RD0Jh7L_KVfh8wj765XPveyeeLEc0c`;
const FireBase=`https://loax-70d8e.firebaseio.com/`;
const Register =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=`;
const Signin =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=`;
const Exchange =`https://securetoken.googleapis.com/v1/token?key=`;

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
    }).then(response => response.data);

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
    }).then(response => response.data);

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
    }).then(response => response.data);

    return{
        type:"exchange_token",
        payload:request,
    }
}