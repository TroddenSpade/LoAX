import {combineReducers} from 'redux';

import login from './login';
import posts from './posts';
import myProfile from './myProfile';
import profile from './profile';

const rootReducer = combineReducers({
    login,
    posts,
    myProfile,
    profile,
});

export default rootReducer;