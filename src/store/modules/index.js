import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import resetPassword from './resetpassword/reducer';
import articleReducer from './article/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  articleReducer
});
export default rootReducer;
