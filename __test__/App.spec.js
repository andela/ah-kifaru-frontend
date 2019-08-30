import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/notFoundPage';
import landingPage from '@modules/landingPage/index';
import Menu from '../src/components/userMenu';
import Auth from '../src/components/auth';
import * as landingPageReducer from '../src/store/modules/landingPage/index';

import App from '../src/routes/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  authReducer: {
    isAuthenticated: false,
    user: {},
    status: 'rest'
  },
  articleReducer: landingPageReducer
});
const props = {
  authAction: jest.fn(),
  status: '',
  isAuthenticated: false,
  error: null,
  location: { url: '/articles' },
  history: { push: jest.fn() }
};

describe('Application test', () => {
  it('should not crash app', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine on Login Page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage {...props} />
        </BrowserRouter>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('it should render 404 PAGE without crashing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render without crashing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('[to="/"]')).toHaveLength(4);
    expect(wrapper.find('Link').length).toBeGreaterThan(1);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li').length).toBeGreaterThan(1);
  });

  it('should renders without crashing', () => {
    const wrapper = mount(<Auth />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('a').length).toBeGreaterThan(1);
    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper.find('[href="/login"]')).toHaveLength(1);
    expect(wrapper.find('[href="/signup"]')).toHaveLength(1);
  });
});
