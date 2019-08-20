import axios from 'axios';
import {
  FETCHARTICLES_FAILURE,
  FETCHARTICLES_PENDING,
  FETCHARTICLES_SUCCESS
} from '../actionTypes/index';
import config from '../../../../config';

export const fetchArticlesPending = () => ({
  type: FETCHARTICLES_PENDING,
  payload: {
    status: 'fetchPending',
    error: null,
    articles: []
  }
});

export const fetchArticlesSuccess = articles => ({
  type: FETCHARTICLES_SUCCESS,
  payload: {
    status: 'fetchSuccess',
    error: null,
    articles
  }
});

export const fetchArticlesFailure = error => ({
  type: FETCHARTICLES_FAILURE,
  payload: {
    status: 'fetchFailure',
    error,
    articles: []
  }
});

export const fetchArticlesAction = ({ limit, page }) => async dispatch => {
  dispatch(fetchArticlesPending());
  try {
    const response = await axios({
      method: 'get',
      url: `${config.apiUrl}/articles/popular?page=${page}$limit=${limit}`
    });

    const { data } = response.data;
    console.log('this is the response from the database', data);
    dispatch(fetchArticlesSuccess(data));
  } catch ({ response }) {
    const { message } = response.data;
    dispatch(fetchArticlesFailure(message));
  }
};
