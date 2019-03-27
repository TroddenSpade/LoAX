
export default search =(state={loading:null,list:[]},action)=>{
    switch(action.type){
        case 'START_SEARCH':
            return Object.assign({},{loading:true});

        case 'SEARCH_SUCCESS':
            let list = state.list.concat(action.payload);
            let skip = action.skip > list.length ? undefined : action.skip;
            return Object.assign({}, state, { list:list, loading: false, skip:skip })

        case 'REFRESH_SEARCH':
        console.log(action.payload)
            let firstSkip = action.skip > action.payload.length ? undefined : action.skip;
            return Object.assign({}, state, { list:action.payload , loading: false,skip:firstSkip })

        case 'SEARCH_ERROR':
            return Object.assign({},state,{loading:false,err:action.payload})
            
        default:
            return state;
    }
}