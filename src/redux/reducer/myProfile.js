export default myProfile =(state={loading:true,list:[]},action)=>{
    switch(action.type){
        case 'START_LOADING_MY_POSTS':
            return{loading:true}

        case 'MY_POSTS_SUCCESS':
            let list = state.list.concat(action.payload);
            const skip = action.skip > list.length ? undefined : action.skip;
            return Object.assign({}, state, { list:list, loading: false, skip:skip })

        case'MY_POSTS_REFRESH':
            return Object.assign({}, state, { list:action.payload, loading: false, skip:action.skip });

        case 'MY_POSTS_ERROR':
            return Object.assign({},state,{loading:false ,error:action.payload});

        case 'POST_DELETED':
            var arr = state.list.slice();
            arr.splice(action.key, 1);
            return {
                ...state,
                list:arr
            }

        case 'POST_ADDED':
            var arr = state.list.slice();
            arr.unshift(action.payload);
            return Object.assign({}, state, { list:arr });

        default:
            return state
    }
}