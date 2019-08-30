import {
  FETCHARTICLES_PENDING,
  FETCHARTICLES_FAILURE,
  FETCHARTICLES_SUCCESS
} from '../actionTypes/index';
import initialState from '../index';

const fetchArticlesTypes = [
  FETCHARTICLES_PENDING,
  FETCHARTICLES_SUCCESS,
  FETCHARTICLES_FAILURE
];
const fetcharticlesReducers = (state = initialState, { type, payload }) => {
  return fetchArticlesTypes.includes(type) ? { ...state, ...payload } : state;
};

export default fetcharticlesReducers;
