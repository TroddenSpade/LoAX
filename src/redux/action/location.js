import * as firebase from 'firebase';

export const location =(geoHash)=>{
    return (dispatch,getState)=>{
        dispatch({type:'LOADING_START'});
        let posts=[];
        firebase.database().ref(`post`)
        .orderByChild(`geoHash`)
        .once(`value`)
        .then(async (snapshot) => {
            for(let key in snapshot.val()){
                await firebase.database().ref(`user/${snapshot.val()[key].userid}`)
                .once(`value`)
                .then(async (snapshot2)=>{
                    posts.push({
                        ...snapshot.val()[key],
                        "username":snapshot2.val().username,
                        "avatar":snapshot2.val().pic,
                    })
                    return snapshot2
                })
            }
            return posts
        }).then((response)=>dispatch({type:'LOCATION_POSTS_SUCCESS',payload:response}))
        .catch((e)=>console.log(e))
    }
}