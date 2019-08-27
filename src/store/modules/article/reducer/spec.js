import articleReducer, { initialState } from './index';
import { COMPLETE_ARTICLE, PENDING_ARTICLE } from '../articleType';

let action;
let newState;
const completed = { type: COMPLETE_ARTICLE, payload: { isLoading: false } };
const pending = { type: PENDING_ARTICLE, payload: { isLoading: true } };
describe('Auth Reducer', () => {
  it('should return initial state for unkwon action types', () => {
    action = { type: null };
    newState = articleReducer(initialState, action);
    expect(newState).toEqual(initialState);
    expect(newState.isLoading).toEqual(false);
  });
  it('should handle action with type COMPLETE_ARTICLE', () => {
    newState = articleReducer(initialState, completed);
    expect(completed.type).toEqual('COMPLETE_ARTICLE');
    expect(completed.payload.isLoading).toEqual(newState.isLoading);
  });
  it('should handle action with type PENDING_ARTICLE', () => {
    newState = articleReducer(initialState, pending);
    expect(pending.type).toEqual('PENDING_ARTICLE');
    expect(pending.payload.isLoading).toEqual(newState.isLoading);
  });
});
