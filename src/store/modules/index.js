import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import articleReducer from './article/reducer';
import resetPassword from './resetpassword/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  articleReducer
});
export default rootReducer;
