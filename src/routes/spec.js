import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';

const createStore = (isAuthenticated = false) => {
  const content = {
    authReducer: {
      isAuthenticated,
      user: {},
      status: 'authenticationSuccess'
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    authReducer: { ...content }
  });
  return store;
};

describe('PRIVATE ROUTE COMPONENT', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={createStore(true)}>
        <Router>
          <PrivateRoute location={{ from: '/' }} component={LoginPage} />
        </Router>
      </Provider>
    );

    expect(wrapper.find('LoginPage')).toBeTruthy();
  });
  it('should successfully redirect a user to the intended route', () => {
    const wrapper = mount(
      <Provider store={createStore(false)}>
        <Router>
          <PrivateRoute location={{ from: '/' }} component={LoginPage} />
        </Router>
      </Provider>
    );
    const path = wrapper.find('Redirect').props().to;
    expect(wrapper.find('Redirect')).toBeTruthy();
    expect(path.pathname).toEqual('/login');
    expect(path.url.from).toEqual('/');
  });
});
