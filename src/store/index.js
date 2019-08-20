import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/auth/reducer';

const middlewares = applyMiddleware(thunkMiddleware);

const store = createStore(rootReducer, composeWithDevTools(middlewares));

export default store;
