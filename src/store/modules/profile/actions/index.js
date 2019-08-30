/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as toast from 'toastr';
import { SUCCESS_PROFILE, FAILURE_PROFILE } from '../actionTypes';

export const getProfile = (id, userId) => async dispatch => {
  if (userId === id) {
    axios.defaults.headers.common.Authorization = JSON.parse(
      localStorage.getItem('token')
    );
  } else {
    const token = jwt.sign({ id }, 'jvdfdfjdjfd', { expiresIn: '24h' });
    axios.defaults.headers.common.Authorization = token;
  }
  try {
    const response = await axios.get(
      `https://errorswag-staging.herokuapp.com/api/v1/users/${id}`
    );
    if (response) {
      const followers = await axios.get(
        'https://errorswag-staging.herokuapp.com/api/v1/users/followers'
      );
      const followee = await axios.get(
        'https://errorswag-staging.herokuapp.com/api/v1/users/followers'
      );
      const articles = await axios.get(
        'https://errorswag-staging.herokuapp.com/api/v1/articles'
      );
      dispatch({
        type: SUCCESS_PROFILE,
        payload: {
          profile: response.data.data,
          error: '',
          followers: followers.data.data,
          followee: followee.data.data,
          articles: articles.data.data
        }
      });
    }
  } catch (error) {
    const err =
      error.response !== undefined ? error.response.message : error.message;
    dispatch({
      type: FAILURE_PROFILE,
      payload: {
        profile: null,
        error: err,
        followee: null,
        follower: null,
        articles: null
      }
    });
    toast.error(err);
  }
};
