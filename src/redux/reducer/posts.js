export default posts=(state={loading:true},action)=>{
    switch(action.type){
        case 'START_LOADING':
            return Object.assign({},state,{loading:true})

        case 'POSTS_SUCCESS':
                return Object.assign({}, state, { list: action.payload, loading: false })

        case 'POSTS_ERROR':
            return Object.assign({},state,{loading:true})

        default:
            return state;
    }
}
