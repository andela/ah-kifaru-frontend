import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE } from '../actionTypes';
import initialState from '../index';

const authTypes = [AUTH_PENDING, AUTH_FAILURE, AUTH_SUCCESS];
const authReducer = (state = initialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};
export default authReducer;
