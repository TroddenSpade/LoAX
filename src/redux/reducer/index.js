import {combineReducers} from 'redux';
import userRegister from './reducer';

const rootReducer = combineReducers({
    userRegister,
});

export default rootReducer;