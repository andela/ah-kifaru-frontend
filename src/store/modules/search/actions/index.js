import axios from 'axios';
import * as Toastr from 'toastr';
import {
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actionTypes/index';

/* istanbul ignore next */
export const searchPending = () => ({
  type: SEARCH_PENDING,
  payload: {
    error: null,
    result: [],
    searchStatus: 'rest'
  }
});

/* istanbul ignore next */
export const searchSuccess = result => ({
  type: SEARCH_SUCCESS,
  payload: {
    error: null,
    result,
    searchStatus: 'searchSuccess'
  }
});

/* istanbul ignore next */
export const searchFailure = error => ({
  type: SEARCH_FAILURE,
  payload: {
    status: 'searchFailure',
    error,
    searchStatus: 'searchFailure'
  }
});

/* istanbul ignore next */
export const searchAction = ({
  searchParameter
  // history = null
}) => async dispatch => {
  dispatch(searchPending());

  // if (history && history.location.pathname !== '/search') {
  //   history.push('/search');
  // }

  const searchBy = searchParameter || '';

  console.log('here noe');

  try {
    /* istanbul ignore next */
    const response = await axios({
      method: 'get',
      url: `${process.env.API_BASE_URL}/search/articles/?params=${searchBy}`
    });

    console.log('the long response', response);
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
