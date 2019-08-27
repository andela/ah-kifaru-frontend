import React from 'react';
import moxios from 'moxios';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import createStore from 'redux-mock-store';
import { initialState } from '../reducer';
import { publishArticle, draftArticle } from './index';
import { COMPLETE_ARTICLE, PENDING_ARTICLE } from '../articleType';

const mockStore = createStore([thunk]);
const store = mockStore({
  articleReducer: initialState
});

const article = {
  title: 'Title',
  description: 'Adescription for title',
  body: 'this ia the body of the article',
  tag: 'may javascript'
};

const completed = {
  type: COMPLETE_ARTICLE,
  payload: { isLoading: false }
};

const pending = {
  type: PENDING_ARTICLE,
  payload: { isLoading: true }
};

// mock functions
const history = { push: jest.fn() };
const goodSeverCall = () =>
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: { data: article }
    });
  });
const badServerCall = () =>
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 500,
      response: { message: 'Error' }
    });
  });
const toastr = { success: jest.fn() };
describe('publishArticle action', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should publish article', () => {
    goodSeverCall();
    const expected = [pending, completed];
    return store.dispatch(publishArticle(article, history)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should catch errors when publishing', () => {
    badServerCall();
    const expected = [pending, completed];
    return store.dispatch(publishArticle(article, history)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe('draftArticle action', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should draft an article', () => {
    goodSeverCall();
    const expected = [pending, completed];
    return store.dispatch(draftArticle(article, history)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
  it('should redirect to the article', () => {
    badServerCall();
    const expected = [pending, completed];
    return store.dispatch(draftArticle(article, history)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
