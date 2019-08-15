import React from 'react';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from '@pages/loginPage';
import HomePage from '@pages/homePage';
import NotFoundPage from '@pages/notFoundPage';
import Menu from '../src/components/userMenu';
import Footer from '../src/components/Footer/index';
import Auth from '../src/components/auth';

import App from '../src/routes/AppRouter';

const auth = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isLoginPending: false,
        isAuthenticated: !action.user,
        user: action.user
      };
    default:
      return state;
  }
};

describe('Application test', () => {
  let store;
  beforeEach(() => {
    store = createStore(
      combineReducers({
        auth
      })
    );
  });
  it('should render index page', () => {
    const comp = (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <App dispatch={jest.fn()} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
    const wrapper = mount(comp);

    expect(wrapper.find('Home')).toBeTruthy();
  });
  it('should not crash app', () => {
    const wrapper = mount(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should work fine on Login Page', () => {
    const wrapper = mount(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('it should render Home Page without crashing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
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
    const wrapper = mount(<Menu />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('[href="/"]')).toHaveLength(4);
    expect(wrapper.find('a').length).toBeGreaterThan(1);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li').length).toBeGreaterThan(1);
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
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
