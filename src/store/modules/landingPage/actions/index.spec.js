import { cleanup } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { strictEqual } from 'assert';
import { Stream } from 'stream';
import initialState from '../index';
import * as actions from './index';
import * as types from '../actionTypes';

const mockStore = configureMockStore([thunk]);

const currentPage = 1;
const totalPages = 15;

describe('Action tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  const articles = [{}, {}, {}];

  test('should create an action for successful article fetch request', () => {
    const expectedAction = {
      type: types.FETCHARTICLES_SUCCESS,
      payload: {
        status: 'fetchSuccess',
        error: null,
        articles,
        currentPage,
        totalPages
      }
    };
    expect(
      actions.fetchArticlesSuccess({ articles, currentPage, totalPages })
    ).toEqual(expectedAction);
  });

  test('should create an action for failed article fetch request', () => {
    const expectedAction = {
      type: types.FETCHARTICLES_FAILURE,
      payload: {
        status: 'fetchFailure',
        error: 'Search word does not exist',
        articles: [],
        currentPage: null,
        totalPages: null
      }
    };

    expect(
      actions.fetchArticlesFailure({
        error: 'Search word does not exist',
        currentPage: null,
        totalPages: null
      })
    ).toEqual(expectedAction);
  });

  test('should create an action for successful article fetch request', () => {
    const expectedAction = {
      type: types.FETCHARTICLES_PENDING,
      payload: {
        status: 'fetchPending',
        error: null,
        articles: [],
        currentPage: null,
        totalPages: null
      }
    };
    expect(actions.fetchArticlesPending()).toEqual(expectedAction);
  });
});

describe('Asycnhronous fetch action', () => {
  const store = mockStore({});
  const articles = [{}, {}, {}, {}, {}, {}];
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  // jest.mock('axios');
  test('succesfull fetch popular articles request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: articles
      });
    });

    const expectedActions = [
      {
        type: 'FETCHARTICLES_PENDING',
        payload: {
          status: 'fetchPending',
          error: null,
          articles: [],
          currentPage: null,
          totalPages: null
        }
      },
      {
        type: 'FETCHARTICLES_SUCCESS',
        payload: {
          status: 'fetchSuccess',
          error: null,
          articles: undefined,
          currentPage: null,
          totalPages: null
        }
      }
    ];

    await store.dispatch(actions.fetchArticlesAction({ limit: 15, page: 1 }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('failed fetch popular articles request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        NotResponse: articles
      });
    });

    const expectedActions = [
      {
        type: 'FETCHARTICLES_PENDING',
        payload: {
          status: 'fetchPending',
          error: null,
          articles: [],
          currentPage: null,
          totalPages: null
        }
      },
      {
        type: 'FETCHARTICLES_FAILURE',
        payload: {
          status: 'fetchFailure',
          error: undefined,
          articles: [],
          currentPage: null,
          totalPages: null
        }
      }
    ];

    await store.dispatch(actions.fetchArticlesAction({ limit: 15, page: 1 }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
