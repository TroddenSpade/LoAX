import {combineReducers} from 'redux';

import login from './login';
import posts from './posts';

const rootReducer = combineReducers({
    login,
    posts
});

export default rootReducer;