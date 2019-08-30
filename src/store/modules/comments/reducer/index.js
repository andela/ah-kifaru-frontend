import {
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from '../actionTypes';

export const initialState = {
  comments: [],
  error: null,
  status: 'rest'
};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS_PENDING:
    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_FAILURE:
    case POST_COMMENT_PENDING:
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        ...payload
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        ...payload,
        comments: [payload.comment, ...state.comments]
      };
    default:
      return state;
  }
};

export default commentReducer;
