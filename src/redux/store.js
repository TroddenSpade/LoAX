import {createStore , applyMiddleware} from 'redux';
import promiseMiddleware from "redux-promise";
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const Store = createStore(rootReducer,applyMiddleware(thunk,promiseMiddleware));

export default Store;
