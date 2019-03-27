export default profile = (state={postsLoading:true,profileLoading:true},action)=>{
    switch(action.type){
        case 'USER_DATA_LOADING':
            return{...state,profileLoading:true}

        case 'START_LOADING_USER_POSTS':
            return{...state,postsLoading:true}

        case 'USER_SUCCESS':
            return{...state,profileLoading:false,user:action.payload}

        case 'MY_POSTS_ERROR':
            return {...state ,err:action.payload}

        case 'USER_POSTS_REFRESH':
            return Object.assign({}, state, { list:action.payload, postsLoading: false, skip:action.skip });

        case 'USER_POSTS_SUCCESS':
            let list = state.list.concat(action.payload);
            const skip = action.skip > list.length ? undefined : action.skip;
            return Object.assign({}, state, { list:list, postsLoading: false, skip:skip });

        case 'MY_POSTS_ERROR':
            return {...state ,err:action.payload}

        default:
            return state;
    }
}