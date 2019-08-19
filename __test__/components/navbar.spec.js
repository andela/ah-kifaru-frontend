import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar, { AuthButtons } from '@components/NavBar';

const mockState = () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(() => [true, setState]);
};
const authReducer = {
  isAuthenticated: false,
  user: {},
  status: 'rest'
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  authReducer
});

describe('<NavBar />', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set data-active to true when isLoggedIn is set to false and harmbugger is clicked', () => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    wrapper.find('#hamburger').simulate('click');
    mockState();
    expect(wrapper.find('#hamburger').props()['data-active']).toEqual(true);
  });

  it('should display the avatar icon when isLoggedIn is set to true', () => {
    authReducer.isAuthenticated = true;
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('#menu')
        .childAt(0)
        .hasClass('avatar')
    ).toEqual(true);

    expect(
      wrapper
        .find('#menu')
        .childAt(0)
        .children()
        .html()
    ).toContain('<icon-mock classname="w-8 h-8"></icon-mock>');
  });

  it('should display auth button when isLoggedIn is false ', () => {
    authReducer.isAuthenticated = false;
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(wrapper.find('#auth-buttons').children()).toHaveLength(2);

    expect(
      wrapper
        .find('#auth-buttons')
        .childAt(0)
        .props().children
    ).toEqual('LOGIN');

    expect(
      wrapper
        .find('#auth-buttons')
        .childAt(1)
        .props().children
    ).toEqual('GET STARTED');
  });

  it('should not display auth button when isLoggedIn is true ', () => {
    authReducer.isAuthenticated = true;
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    expect(wrapper.find('#auth-buttons').children()).not.toHaveLength(2);

    expect(toJson(wrapper.find('#auth-buttons').childAt(0))).toBeFalsy();

    expect(toJson(wrapper.find('#auth-buttons').childAt(1))).toBeFalsy();
  });
});
