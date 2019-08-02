import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import resetPassword from './resetpassword/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword
});
export default rootReducer;
