import * as firebase from 'firebase';

export const location =(geoHash)=>{
    return (dispatch,getState)=>{
        dispatch({type:'LOADING_START'});
        firebase.database().ref(`post`)
        .orderByChild(`geoHash`)
        .once(`value`)
        .then((snapshot) => {
            return Object.values(snapshot.val());
        }).then((response)=>dispatch({type:'LOCATION_POSTS_SUCCESS',payload:response}))
        .catch((e)=>console.log(e))
    }
}