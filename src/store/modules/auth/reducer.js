import actionTypes from '@modules/auth/actionTypes';

const { LOGIN_SUCCESS } = actionTypes;

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
