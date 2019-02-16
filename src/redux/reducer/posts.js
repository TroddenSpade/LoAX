export default posts=(state={loading:true},action)=>{
    switch(action.type){
        case 'START_LOADING':
            return Object.assign({},state,{loading:true})

        case 'POSTS_SUCCESS':
            return Object.assign({}, state, { list:action.payload , loading: false,lastKey:action.lastKey })

        case 'POSTS_ADDED':
            let arr= state.list.concat(action.payload);
            return Object.assign({},state,{list:arr,lastKey:action.lastKey});

        case 'POSTS_ERROR':
            return Object.assign({},state,{loading:true})

        default:
            return state;
    }
}
