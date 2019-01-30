export default login = (state={},action)=>{
    switch(action.type){
        case 'user_register':
            return {
                newUser:{
                    userid:action.payload.localId,
                    token:action.payload.idToken,
                    refreshToken:action.payload.refreshToken,
                }
            }
        case 'user_signin':
            return {
                userData:{
                    userid:action.payload.localId,
                    token:action.payload.idToken,
                    refreshToken:action.payload.refreshToken,
                }
            }
        default :
            return state;
    }
}