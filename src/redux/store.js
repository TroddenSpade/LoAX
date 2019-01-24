import {createStore , applyMiddleware} from 'redux';
import promiseMiddleware from "redux-promise";

const Store = applyMiddleware(promiseMiddleware)(createStore);

export default Store;
