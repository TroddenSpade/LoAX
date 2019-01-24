export default reducer = (state={},action)=>{
    switch(action.type){
        case 'reducer':
            return {...state,post:action.payload}
        default :
            return state;
    }
}