import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import resetPassword from './resetpassword/reducer';
import articleReducer from './landingPage/reducer/index';
import searchReducer from './search/reducer/index';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  articleReducer,
  searchReducer
});
export default rootReducer;
