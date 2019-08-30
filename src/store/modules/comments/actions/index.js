import axios from 'axios';
import * as Toastr from 'toastr';
import { getErrorResponse } from '@utils/getResponse';
import getUserInfo from '../../../../utils/getUserFromToken';
import axiosCall from '../../../../utils/axiosCall';
import {
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from '../actionTypes';

export const getCommentPending = () => ({
  type: GET_COMMENTS_PENDING,
  payload: {
    status: 'commentPending',
    error: null,
    comments: []
  }
});

export const getCommentSuccess = comments => ({
  type: GET_COMMENTS_SUCCESS,
  payload: {
    status: 'commentSuccess',
    error: null,
    comments
  }
});

export const getCommentFailure = () => ({
  type: GET_COMMENTS_FAILURE,
  payload: {
    status: 'commentFailure',
    comments: []
  }
});

export const postCommentPending = () => ({
  type: POST_COMMENT_PENDING,
  payload: {
    status: 'postcommentPending',
    error: null
  }
});

export const postCommentSuccess = comment => ({
  type: POST_COMMENT_SUCCESS,
  payload: {
    status: 'postCommentSuccess',
    error: null,
    comment
  }
});

export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  payload: {
    status: 'postcommentFailure',
    error
  }
});
export const getComments = articleId => async dispatch => {
  dispatch(getCommentPending());
  try {
    const response = await axios({
      method: 'get',
      baseURL: `${process.env.API_BASE_URL}/comments/${articleId}`
    });
    const { rows } = response.data.data;

    dispatch(getCommentSuccess(rows));
  } catch (error) {
    const message = getErrorResponse(error);
    dispatch(getCommentFailure(message));
    Toastr.error(message);
  }
};

export const postComments = (articleId, content) => async dispatch => {
  dispatch(postCommentPending());
  try {
    const response = await axiosCall('post', `comments/${articleId}`, content);
    const rows = response.data.data;
    const { id, username } = getUserInfo();
    rows.user = { id, username };
    dispatch(postCommentSuccess(rows));
  } catch (error) {
    const message = getErrorResponse(error);
    Toastr.error(message);
    dispatch(postCommentFailure(message));
  }
};
