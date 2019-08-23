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

export const authAction = ({
  userData,
  history,
  url = undefined
}) => async dispatch => {
  const { username = undefined, email, password } = userData;
  dispatch(authPending());
  try {
    const authRoute = username ? 'signup' : 'login';

    const details = username
      ? { username, email, password }
      : { username, password };

    const response = await axios({
      method: 'post',
      url: `${process.env.API_BASE_URL}/auth/${authRoute}`,
      data: details
    });
    const { token } = response.data.data;

    saveToLocalStorage({ token, url });

    const user = decodeToken({ history });
    Toastr.success('Welcome to ErrorSwag!');
    dispatch(authSuccess(user));

    return url ? history.push(url) : history.push('/');
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    Toastr.error(message);
    dispatch(authFailure(message));
  }
};

export const socialLogin = payload => async dispatch => {
  await dispatch(authSuccess(payload));
  Toastr.success('Welcome to ErrorSwag');
};
