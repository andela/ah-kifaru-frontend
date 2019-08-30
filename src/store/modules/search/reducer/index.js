import {
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actionTypes/index';

import initialState from '../index';

const searchTypes = [SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_FAILURE];

const searchReducer = (state = initialState, { type, payload }) => {
  return searchTypes.includes(type) ? { ...state, ...payload } : state;
};

export default searchReducer;
