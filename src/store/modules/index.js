import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import resetPassword from './resetpassword/reducer';
import commentReducer from './comments/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  commentReducer
});
export default rootReducer;
