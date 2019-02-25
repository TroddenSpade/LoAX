export default search =(state={loading:null},action)=>{
    switch(action.type){
        case 'SEARCH_START_LOADING':
            return Object.assign({},{loading:true});

        case 'SEARCH_POSTS_SUCCESS':
            return Object.assign({}, state, { list:action.payload , loading: false,lastKey:action.lastKey })

        case 'SEARCH_POSTS_ADDED':
            let arr= state.list.concat(action.payload);
            return Object.assign({},state,{list:arr,lastKey:action.lastKey});

        case 'SEARCH_POSTS_ERROR':
            return Object.assign({},state,{loading:true})
            
        default:
            return state;
    }
}