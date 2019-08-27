import axios from 'axios';
import {
  FETCHARTICLES_FAILURE,
  FETCHARTICLES_PENDING,
  FETCHARTICLES_SUCCESS
} from '../actionTypes/index';

export const fetchArticlesPending = () => ({
  type: FETCHARTICLES_PENDING,
  payload: {
    status: 'fetchPending',
    error: null,
    articles: [],
    currentPage: null,
    totalPages: null
  }
});

export const fetchArticlesSuccess = ({
  articles,
  currentPage = null,
  totalPages = null
}) => ({
  type: FETCHARTICLES_SUCCESS,
  payload: {
    status: 'fetchSuccess',
    error: null,
    articles,
    currentPage,
    totalPages
  }
});

export const fetchArticlesFailure = ({ error }) => ({
  type: FETCHARTICLES_FAILURE,
  payload: {
    status: 'fetchFailure',
    error,
    articles: [],
    currentPage: null,
    totalPages: null
  }
});

export const fetchArticlesAction = ({
  limit = 15,
  page = 1
}) => async dispatch => {
  dispatch(fetchArticlesPending());

  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.API_BASE_URL}/articles/popular?page=${page}$limit=${limit}`
    });

    const { data } = response.data;

    dispatch(fetchArticlesSuccess({ articles: data }));
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    dispatch(fetchArticlesFailure(message));
  }
};
