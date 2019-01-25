import axios from 'axios';
const API =`AIzaSyDt3RD0Jh7L_KVfh8wj765XPveyeeLEc0c`;
const Register =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=`;

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