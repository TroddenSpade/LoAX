import * as firebase from 'firebase';

export const search=(lastKey,tag)=>{
    const FIRST_LOAD = 0;
    const RELOAD = -1;
    if(lastKey == FIRST_LOAD || lastKey == RELOAD){
        return async (dispatch , getState)=>{
            let posts=[];
            let arrayOfKeys =[];
            if(lastKey == FIRST_LOAD) dispatch({type:'SEARCH_START_LOADING'});
            firebase.database().ref(`post`)
            .orderByChild(`tags/${tag}`)
            .equalTo(true)
            .limitToFirst(5)
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
                arrayOfKeys= Object.keys(snapshot.val())
                return posts
            }).then((response)=>dispatch({type:'SEARCH_POSTS_SUCCESS',payload:response,lastKey:arrayOfKeys[4]}))
            .catch((e)=>console.log(e))
            
        }
    }else{
        return async (dispatch , getState)=>{
            let posts=[];
            let arrayOfKeys =[];
            firebase.database().ref(`post`)
            .orderByChild(`tags/${tag}`)
            .equalTo(true)
            .startAt(lastKey)
            .limitToFirst(6)
            .once(`value`)
            .then(async (snapshot) => {
                let count = 0;
                for(let key in snapshot.val()){
                    count ++;
                    if (count == 1) continue;
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
                arrayOfKeys= Object.keys(snapshot.val())
                return posts
            }).then((response)=>dispatch({type:'SEARCH_POSTS_ADDED',payload:response,lastKey:arrayOfKeys[5]}))
            .catch((e)=>dispatch({type:'SEARCH_POSTS_ERROR',error:e}))
        }
    }
}