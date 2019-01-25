export default reducer = (state={},action)=>{
    switch(action.type){
        case 'user_register':
            return {...state,newUser:action.payload}
        default :
            return state;
    }
}