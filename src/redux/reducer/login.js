export default login = (state={},action)=>{
    switch(action.type){
        case 'user_register':
            return {
                newUser:{
                    userid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refreshToken:action.payload.refreshToken || false,
                }
            }
        case 'user_signin':
            return {
                userData:{
                    userid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refreshToken:action.payload.refreshToken || false,
                }
            }
        case 'exchange_token':
            return{
                userData:{
                    userid:action.payload.user_id || false,
                    token:action.payload.id_token || false,
                    refreshToken:action.payload.refresh_token || false,
                } 
            }
        default :
            return state;
    }
}