import { AsyncStorage } from 'react-native'

export const setTokens =(data)=>{
    const now = new Date();
    const expire = now.getTime() + 60*60*1000;
    AsyncStorage.multiSet([
        ['@LoAX@token',data.idToken],
        ['@LoAX@refereshToken',data.refreshToken],
        ['@LoAX@expireToken',expire.toString()],
        ['@LoAX@userid',data.localId]
    ]).then(()=>console.log("Token Has Been Set"));
}

export const getTokens=(func)=>{
    AsyncStorage.multiGet([
        '@LoAX@token',
        '@LoAX@refereshToken',
        '@LoAX@expireToken',
        '@LoAX@userid'
    ]).then(response => func(response));
}

export const removeToken =(CBfunction)=>{
    AsyncStorage.multiRemove([
        '@LoAX@token',
        '@LoAX@refereshToken',
        '@LoAX@expireToken',
        '@LoAX@userid'
    ]).then(()=>CBfunction());
}