import {combineReducers} from 'redux';

import login from './login';
import posts from './posts';
import profile from './profile';

const rootReducer = combineReducers({
    login,
    posts,
    profile
});

export default rootReducer;