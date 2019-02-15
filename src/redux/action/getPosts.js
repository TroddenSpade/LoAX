import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDt3RD0Jh7L_KVfh8wj765XPveyeeLEc0c",
    authDomain: "loax-70d8e.firebaseapp.com",
    databaseURL: "https://loax-70d8e.firebaseio.com",
    storageBucket: "loax-70d8e.appspot.com"
};
  
firebase.initializeApp(firebaseConfig);


export const getPosts=(lastKey)=>{
    // if(tag==null){
    //     let URL = `${FireBase}/post.json`;
    // }else{
    //     let URL =`${FireBase}`;
    // }

    if(lastKey == null){
        return async (dispatch , getState)=>{
            let posts=[];
            let arrayOfKeys =[];
            dispatch({type:'START_LOADING'});
            firebase.database().ref(`post`)
            .orderByKey()
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
            }).then((response)=>dispatch({type:'POSTS_SUCCESS',payload:response,lastKey:arrayOfKeys[4]}))
            .catch((e)=>dispatch({type:'POSTS_ERROR',error:e}))
            
        }
    }else{
        return async (dispatch , getState)=>{
            let posts=[];
            let arrayOfKeys =[];
            dispatch({type:'START_LOADING'});
            firebase.database().ref(`post`)
            .orderByKey()
            .startAt(lastKey)
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
            }).then((response)=>dispatch({type:'POSTS_SUCCESS',payload:response,lastKey:arrayOfKeys[4]}))
            .catch((e)=>dispatch({type:'POSTS_ERROR',error:e}))
            
        }
    }
    
}