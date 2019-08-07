import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SETUP_USER
} from '../actionTypes';
import { axiosCall, saveToLocalStorage } from '../../utils';

export const signupPending = () => ({
  type: SIGNUP_PENDING,
  payload: {
    status: 'authenticationLoading',
    error: null,
    user: {}
  }
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: {
    status: 'authenticationSuccessful',
    error: null,
    user
  }
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: {
    status: 'authenticationFail',
    error,
    user: {}
  }
});

export const setUpUser = user => ({
  type: SETUP_USER,
  payload: {
    status: 'authenticationSuccessful',
    error: null,
    user
  }
});

export const signupAction = ({
  username,
  email,
  password
}) => async dispatch => {
  dispatch(signupPending());
  try {
    const response = await axiosCall({
      method: 'post',
      path: '/auth/signup',
      payload: {
        username,
        email,
        password
      }
    });

    const user = response.data;
    saveToLocalStorage(user);
    dispatch(signupSuccess(user));
  } catch ({ response }) {
    const message = response.data.message || response;
    dispatch(signupFailure(message));
  }
};

export const getUser = () => dispatch => {
  if (localStorage.user) {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    dispatch(setUpUser(user));
  }
};
