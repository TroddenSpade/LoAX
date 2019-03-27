import axios from 'axios';

import { SEARCH } from '../../utils/links';

export const search=(tag,skip,key,cb)=>{
    console.log('in search')
    return (dispatch,getState)=>{
        console.log(tag)
        if(key==0)  dispatch({type:'START_SEARCH'});
        axios.get(`${SEARCH}?tag=${tag}&skip=${skip}&limit=5&order=desc`)
        .then(response=>{
            console.log(response.data)
            if(key == -1){ //REFRESH
                dispatch({type:'SEARCH_SUCCESS',payload:response.data,skip:skip+5})
            }else{
                dispatch({type:'REFRESH_SEARCH',payload:response.data,skip:skip+5})
            }
            cb();
        })
        .catch(err=>dispatch({type:"SEARCH_ERROR",payload:err}))
    }
}
