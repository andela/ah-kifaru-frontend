import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import resetPassword from './resetpassword/reducer';
import profileReducer from './profile/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  profileReducer
});
export default rootReducer;
