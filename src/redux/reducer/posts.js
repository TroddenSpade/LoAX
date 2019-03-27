export default posts=(state={loading:true,list:[]},action)=>{
    switch(action.type){
        case 'START_LOADING_POSTS':
            return {loading:true}

        case 'POSTS_SUCCESS':
            let list = state.list.concat(action.payload);
            const skip = action.skip > list.length ? undefined : action.skip;
            return Object.assign({}, state, { list:list, loading: false, skip:skip })

        case 'REFRESH_POSTS':
            return Object.assign({}, state, { list:action.payload, loading: false, skip:action.skip })

        case 'POSTS_ERROR':
            return Object.assign({},state,{loading:false ,error:action.payload});

        case 'POST_ADDED':
            var arr = state.list.slice();
            arr.unshift(action.payload);
            return Object.assign({}, state, { list:arr });

        default:
            return state;
    }
}
