import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '@modules/';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

const store = createStore(
  rootReducer,
  {},
  storeEnhancers(applyMiddleware(...middlewares))
);

export default store;
