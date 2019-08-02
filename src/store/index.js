import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from '@modules/auth/reducer';

const rootReducer = combineReducers({
  auth
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

const store = createStore(
  rootReducer,
  {},
  storeEnhancers(applyMiddleware(...middlewares))
);

export default store;
