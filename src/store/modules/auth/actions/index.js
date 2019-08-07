import axios from 'axios';
import * as Toastr from 'toastr';
import { saveToLocalStorage, decodeToken } from '../../../../utils';
import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE } from '../actionTypes';

export const authPending = () => ({
  type: AUTH_PENDING,
  payload: {
    status: 'authenticationPending',
    error: null,
    user: {},
    isAuthenticated: false
  }
});

export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: {
    status: 'authenticationSuccess',
    error: null,
    user,
    isAuthenticated: true
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    status: 'authenticationFail',
    error,
    user: {},
    isAuthenticated: false
  }
});

export const authAction = (userData, history, url = '') => async dispatch => {
  dispatch(authPending());
  try {
    const response = await axios({
      method: 'post',
      baseURL: `${process.env.apiUrl}/auth/login`,
      data: userData
    });
    const { token } = response.data.data;
    saveToLocalStorage({ token, url });
    const user = decodeToken({ history });

    Toastr.success('Welcome to ErrorSwag');
    dispatch(authSuccess(user));

    return url ? history.push(url) : history.push();
  } catch (error) {
    const { message } = error.response.data;
    Toastr.error(message);
    dispatch(authFailure(message));
  }
};

export const socialLogin = payload => async dispatch => {
  await dispatch(authSuccess(payload));
  Toastr.success('Welcome to ErrorSwag');
};
