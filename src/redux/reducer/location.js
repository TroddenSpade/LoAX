export default location =(state={loading:true},action)=>{
    switch(action.type){
        // case 'LOADING_START':
        //     return Object.assign({},state,{loading:true});

        case 'LOCATION_SUCCESS':
            return Object.assign({},state,{loading:false,posts:action.payload});
            
        default:
            return state;
    }
}