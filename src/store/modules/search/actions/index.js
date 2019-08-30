import axios from 'axios';
import * as Toastr from 'toastr';
import {
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actionTypes/index';

export const searchPending = () => ({
  type: SEARCH_PENDING,
  payload: {
    error: null,
    result: [],
    searchStatus: 'rest'
  }
});

export const searchSuccess = result => ({
  type: SEARCH_SUCCESS,
  payload: {
    error: null,
    result,
    searchStatus: 'searchSuccess'
  }
});

export const searchFailure = error => ({
  type: SEARCH_FAILURE,
  payload: {
    status: 'searchFailure',
    error,
    searchStatus: 'searchFailure'
  }
});

export const searchAction = ({
  searchParameter,
  history = null
}) => async dispatch => {
  dispatch(searchPending());

  if (history && history.location.pathname !== '/search') {
    history.push('/search');
  }

  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.API_BASE_URL}/search/?search=${searchParameter}`
    });
    const { data } = response.data;
    dispatch(searchSuccess(data));
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    Toastr.error(message);
    dispatch(searchFailure(message));
  }
};
