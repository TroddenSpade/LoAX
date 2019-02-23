import {combineReducers} from 'redux';

import login from './login';
import posts from './posts';
import myProfile from './myProfile';
import profile from './profile';
import search from './search';

const rootReducer = combineReducers({
    login,
    posts,
    myProfile,
    profile,
    search
});

export default rootReducer;