import axios from "axios";

import { LOCATION } from '../../utils/links';

export const location = (hash) => {
    return (dispatch,getState)=>{
        axios.get(`${LOCATION}?hash=${hash}&order=desc&limit=5&skip=0`)
        .then(response => dispatch({type:'LOCATION_SUCCESS',payload:response.data}) )
        .catch(err=>console.log(err))
    }
};