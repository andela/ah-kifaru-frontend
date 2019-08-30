import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import createArticleReducer from './article/reducer';
import resetPassword from './resetpassword/reducer';
import articleReducer from './landingPage/reducer/index';
import searchReducer from './search/reducer/index';
import commentReducer from './comments/reducer';

const rootReducer = combineReducers({
  authReducer,
  resetPassword,
  articleReducer,
  searchReducer,
  commentReducer,
  createArticleReducer
});
export default rootReducer;
