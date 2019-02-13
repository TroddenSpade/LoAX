export default profile =(state={postsLoading:true,profileLoading:true},action)=>{
    switch(action.type){
        case 'MY_POSTS_SUCCESSFUL':
            return{
                ...state,
                myPosts:action.payload,
                postsLoading:false
            }

        case 'MY_DATA_SUCCESSFUL':
            return{
                ...state,
                myData:action.payload,
                profileLoading:false
            }

        case 'PROFILE_SUCCESSFUL':
            return{
                ...state,
                profile:action.payload,
            }

        default:
            return state
    }
}