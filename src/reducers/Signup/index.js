import {
  SIGNUP_PENDING,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SETUP_USER
} from '../../actions/actionTypes';

const INITIAL_STATE = {
  status: 'rest',
  error: null,
  user: {}
};

const signupReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGNUP_PENDING:
      return { ...state, ...payload };
    case SIGNUP_SUCCESS:
      return { ...state, ...payload };
    case SIGNUP_FAILURE:
      return { ...state, ...payload };
    case SETUP_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default signupReducer;
