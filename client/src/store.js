import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const initialState = {};

const midleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...midleware)));

export default store;