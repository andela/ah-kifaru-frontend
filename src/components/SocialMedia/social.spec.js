import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { userToken } from '../../../__mocks__/mockData';
import SocialMediaButtons from './SocialMediaButtons';
import SocialMediaLogin from './SocialMediaLogin';

const createStore = (isAuthenticated = false) => {
  const content = {
    authReducer: {
      isAuthenticated: true
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    authReducer: { ...content, isAuthenticated }
  });
  return store;
};

describe('SocialMediaButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SocialMediaButtons />);
  });
  it('should contain a div with the class social', () => {
    expect(wrapper.find('div').hasClass('social'));
  });
  it('should contain 3 anchor links', () => {
    expect(wrapper.find('a')).toBeTruthy();
    expect(wrapper.find('a').length).toEqual(3);
  });
});

describe('SocialMediaLogin', () => {
  let wrapper, location, store;
  beforeEach(() => {
    location = {
      search: `token=${userToken}`,
      url: '/home'
    };
  });
  it('should redirect to the home page if the url was not provided', () => {
    delete location.url;
    store = createStore(true);
    localStorage.setItem('token', userToken);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Route
            render={() => {
              return <SocialMediaLogin location={location} />;
            }}
          />
        </Router>
      </Provider>
    );

    expect(JSON.parse(localStorage.getItem('token'))).toEqual(userToken);
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/');
  });
  it('should redirect user to their previous page', () => {
    store = createStore(true);
    localStorage.setItem('url', '/home');
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Route
            render={() => {
              return <SocialMediaLogin location={location} />;
            }}
          />
        </Router>
      </Provider>
    );

    expect(JSON.parse(localStorage.getItem('token'))).toEqual(userToken);
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe(location.url);
  });

  it('should not get token, save in localStorage and decode it if no search is found', () => {
    localStorage.removeItem('token');
    store = createStore(true);
    delete location.search;
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Route
            render={() => {
              return <SocialMediaLogin location={location} />;
            }}
          />
        </Router>
      </Provider>
    );

    expect(JSON.parse(localStorage.getItem('token'))).toEqual(null);
  });
  it('should display the social login buttons', () => {
    store = createStore(false);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Route
            render={() => {
              return <SocialMediaLogin location={location} />;
            }}
          />
        </Router>
      </Provider>
    );

    expect(wrapper.find('SocialMedia')).toBeTruthy();
  });
});
