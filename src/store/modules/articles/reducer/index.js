import actionTypes from '../actionTypes';

const {
  SINGLE_ARTICLE_PENDING,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAILED
} = actionTypes;

const initialState = {
  isPending: false,
  isSuccess: false,
  article: {}
};

const authTypes = [
  SINGLE_ARTICLE_PENDING,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAILED
];

const singleArticleReducer = (state = initialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};

export default singleArticleReducer;
