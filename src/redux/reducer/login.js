
export default login = (state={},action)=>{
    switch(action.type){
        case 'USER_REGISTERED':
            return{
                ...action.payload
            }

        case 'USER_SIGN_IN':
            return {
                ...action.payload
            }

        case 'CHECK_TOKEN':
            return{
                ...action.payload
            }
        
        case 'USER_UPDATED':
            return{
                ...state,
                user:action.payload
            }

        case 'POST_DELETED':
            return{
                valid: true,
                user:{
                    ...state.user,
                    noPosts:state.user.noPosts -1,
                }
            }
        
        case 'POST_ADDED':
            return{
                valid: true,
                user:{
                    ...state.user,
                    noPosts:state.user.noPosts +1,
                }
            }

        default :
            return state;
    }
}