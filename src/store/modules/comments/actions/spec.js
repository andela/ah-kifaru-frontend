import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import jwtDecode from 'jwt-decode';
import thunk from 'redux-thunk';
import { initialState } from '../reducer/index';
import * as actions from './index';
import userInfo from '../../../../utils/getUserFromToken';
import mockData, { mockStoreData } from '../../../../../__mocks__/mockData';

import {
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from '../actionTypes';

const comment = { content: 'I love you' };
const {
  commentReducer: { comments },
  allCommentsData,
  newCommentData,
  errorData
} = mockStoreData;

const { authResponse } = mockData;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  commentReducer: initialState
});

// jwt decode mock
jest.mock('jwt-decode');
jwtDecode.mockImplementation(() => ({
  exp: (new Date().getTime() + 50000) / 1000,
  ...userInfo
}));

// localstorage mocks
localStorage.getItem = jest.fn().mockImplementation(() => authResponse.token);

describe('GET COMMENTS Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates ,GET_COMMENTS_PENDING, GET_COMMENTS_SUCCESS when login is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: allCommentsData
      });
    });

    const expectedActions = [
      {
        type: GET_COMMENTS_PENDING,
        payload: {
          comments: [],
          status: 'commentPending',
          error: null
        }
      },
      {
        type: GET_COMMENTS_SUCCESS,
        payload: {
          comments: [
            {
              articleId: 55,
              content:
                'Martin Weinberg, an attorney for the financier, did not respond to a request for comment Friday about the documents.↵Martin Weinberg, an attorney for the financier, did not respond to a request for comment Friday about the documents.',
              createdAt: '2019-08-26T05:14:27.383Z',
              id: 68,
              updatedAt: '2019-08-26T05:14:27.383Z',
              user: { id: 162, username: 'onyimatics' },
              userId: 162
            }
          ],
          status: 'commentSuccess',
          error: null
        }
      }
    ];
    const articleId = 55;
    return store.dispatch(actions.getComments(articleId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_COMMENTS_FAILURE on login failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: comments
      });
    });

    const expectedActions = [
      {
        type: GET_COMMENTS_PENDING,
        payload: {
          comments: [],
          status: 'commentPending',
          error: null
        }
      },
      {
        type: GET_COMMENTS_FAILURE,
        payload: {
          status: 'commentFailure',
          comments: []
        }
      }
    ];
    const articleId = 55;
    return store.dispatch(actions.getComments(articleId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('POST COMMENT Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates ,POST_COMMENTS_PENDING, POST_COMMENTS_SUCCESS when login is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newCommentData
      });
    });

    const expectedActions = [
      {
        type: POST_COMMENT_PENDING,
        payload: {
          status: 'postcommentPending',
          error: null
        }
      },
      {
        type: POST_COMMENT_SUCCESS,
        payload: {
          comment: {
            ...newCommentData.data,
            ...{ user: { id: undefined, username: undefined } }
          },
          status: 'postCommentSuccess',
          error: null
        }
      }
    ];
    const articleId = 55;
    const content = 'Welldone';
    return store.dispatch(actions.postComments(articleId, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ,POST_COMMENTS_PENDING, POST_COMMENTS_FAILURE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: errorData
      });
    });

    const expectedActions = [
      {
        type: POST_COMMENT_PENDING,
        payload: {
          status: 'postcommentPending',
          error: null
        }
      },
      {
        type: POST_COMMENT_FAILURE,
        payload: {
          status: 'postcommentFailure',
          error: 'Unable to post'
        }
      }
    ];
    const articleId = 55;
    const content = 'Welldone';
    return store.dispatch(actions.postComments(articleId, content)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
