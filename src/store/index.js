import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// TO BE REMOVED WHEN HAVE A REDUCER
const auth = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isLoginPending: false,
        isAuthenticated: !action.user,
        user: action.user
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth });

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

const store = createStore(
  rootReducer,
  {},
  storeEnhancers(applyMiddleware(...middlewares))
);

export default store;
