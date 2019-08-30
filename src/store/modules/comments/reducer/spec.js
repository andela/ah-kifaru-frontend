import commentReducer, { initialState } from './index';
import {
  getCommentPending,
  getCommentSuccess,
  getCommentFailure,
  postCommentPending,
  postCommentSuccess,
  postCommentFailure
} from '../actions';
import { mockStoreData } from '../../../../../__mocks__/mockData';

let action;
let newState;
const comment = { content: 'I love you' };
const { comments } = mockStoreData.commentReducer;
describe('Comment Reducer', () => {
  it('should return initial state for unknown action types', () => {
    action = { type: null };
    newState = commentReducer(initialState, action);
    expect(newState).toEqual(initialState);
    expect(newState.error).toEqual(null);
    expect(newState.status).toEqual('rest');
    expect(newState.comments).toEqual([]);
  });
  it('should handle action with type GET_COMMENT_PENDING', () => {
    const { type, payload } = getCommentPending();
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('GET_COMMENTS_PENDING');
    expect(payload.status).toEqual('commentPending');
    expect(payload.error).toEqual(null);
  });
  it('should handle action with type GET_COMMENT_SUCCESS', () => {
    const { type, payload } = getCommentSuccess(comments);
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('GET_COMMENTS_SUCCESS');
    expect(payload.status).toEqual('commentSuccess');
    expect(payload.error).toEqual(null);
    expect(payload.comments).toEqual(comments);
  });
  it('should handle action with type GET_COMMENT_FAILURE', () => {
    const { type, payload } = getCommentFailure();
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('GET_COMMENTS_FAILURE');
    expect(payload.status).toEqual('commentFailure');
  });
  it('should handle action with type POST_COMMENT_PENDING', () => {
    const { type, payload } = postCommentPending();
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('POST_COMMENT_PENDING');
    expect(payload.status).toEqual('postcommentPending');
    expect(payload.error).toEqual(null);
  });
  it('should handle action with type POST_COMMENT_SUCCESS', () => {
    const { type, payload } = postCommentSuccess(comment);
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('POST_COMMENT_SUCCESS');
    expect(payload.status).toEqual('postCommentSuccess');
    expect(payload.error).toEqual(null);
    expect(payload.comment).toEqual(comment);
  });
  it('should handle action with type POST_COMMENT_FAILURE', () => {
    const { type, payload } = postCommentFailure();
    newState = commentReducer(initialState, { type, payload });
    expect(type).toEqual('POST_COMMENT_FAILURE');
    expect(payload.status).toEqual('postcommentFailure');
  });
});
