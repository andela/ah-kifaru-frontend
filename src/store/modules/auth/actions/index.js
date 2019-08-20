import axios from 'axios';
import * as Toastr from 'toastr';
import { saveToLocalStorage, decodeToken } from '../../../../utils';
import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE, GET_FOLLOWERS } from '../actionTypes';
import { getErrorResponse, getSuccessResponse } from '@utils/getResponse';
import client from '@config/client';

export const authPending = () => ({
  type: AUTH_PENDING,
  payload: {
    status: 'authenticationPending',
    error: null,
    user: {},
    followers: [],
    isAuthenticated: false
  }
});

export const authSuccess = (user, followers) => ({
  type: AUTH_SUCCESS,
  payload: {
    status: 'authenticationSuccess',
    error: null,
    user,
    followers,
    isAuthenticated: true
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    status: 'authenticationFail',
    error,
    user: {},
    followers: [],
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
      ? { email, password, username }
      : { email, password };

    const authResponse = await axios({
      method: 'post',
      url: `${process.env.API_BASE_URL}/auth/${authRoute}`,
      data: details
    });
    const { token } = authResponse.data.data;

    saveToLocalStorage({ token, url });

    const followersResponse = await client().get('/users/followers',{ headers: { "token": `Bearer ${token}`}});
    const { data: followers } = getSuccessResponse(followersResponse);
    console.log(followers);

    const user = decodeToken({ history });
    Toastr.success('Welcome to ErrorSwag!');
    dispatch(authSuccess(user,followers));

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
  const followersResponse = await client().get('/users/followers',{ headers: { "token": `Bearer ${token}`}});
  const { data: followers } = getSuccessResponse(followersResponse);
      console.log(followers);
  await dispatch(authSuccess(payload, followers));
  Toastr.success('Welcome to ErrorSwag');
};


export const getFollowers = id => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      const followersResponse = await client().get('/users/followers',{ headers: { "token": `Bearer ${token}`}});
      const { data: followers } = getSuccessResponse(followersResponse);
      console.log(followers);
      dispatch({type: GET_FOLLOWERS, payload: {followers}});
    } catch (error) {
      const message = getErrorResponse(error);
      console.log(message)
    }
  };
};

