export default profile = (state={postsLoading:true,profileLoading:true},action)=>{
    switch(action.type){
        case 'PROFILE_LOADING_START':
        return{...state,postsLoading:true,profileLoading:true}

        case 'PROFILE_SUCCESSFUL':
        return{...state,profileLoading:false,profile:action.payload}

        case 'POSTS_SUCCESSFUL':
        return{...state,postsLoading:false,posts:action.payload}

        default:
            return state;
    }
}