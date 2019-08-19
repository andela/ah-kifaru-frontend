import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import articleReducer from './article/reducer';

const rootReducer = combineReducers({
  authReducer,
  articleReducer
});

export default rootReducer;
