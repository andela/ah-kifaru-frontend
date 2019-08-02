import actionTypes from '../actionTypes';

const {
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
} = actionTypes;

const initialState = {
  isPending: false,
  isSuccess: false,
  error: null,
  message: null
};

const authTypes = [
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
];

const resetPassword = (state = initialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};

export default resetPassword;
