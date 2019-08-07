import { LOGIN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoginPending: true,
  isAuthenticated: false,
  user: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoginPending: false,
        isAuthenticated: !action.user,
        user: action.user
      };
    default:
      return state;
  }
};

export default auth;
