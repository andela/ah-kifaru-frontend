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

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

const initialState = {
  error: null,
  isAuthenticated: false,
  user: {},
  status: 'rest'
};

const renderWithEnzymes = state => {
  store = mockStore({
    authReducer: {
      ...state
    }
  });
  return mount(
    <Provider store={store}>
      <Router>
        <NavBar />
      </Router>
    </Provider>
  );
};

describe('<NavBar />', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set data-active to true when isLoggedIn is set to false and harmbugger is clicked', () => {
    wrapper = renderWithEnzymes(initialState);
    wrapper.find('#hamburger').simulate('click');
    mockState();
    expect(wrapper.find('#hamburger').props()['data-active']).toEqual(true);
  });

  it('should display the avatar icon when isLoggedIn is set to true', () => {
    wrapper = renderWithEnzymes({
      error: null,
      isAuthenticated: true,
      user: {},
      status: 'rest'
    });

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
    wrapper = renderWithEnzymes(initialState);
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
    wrapper = renderWithEnzymes({
      error: null,
      isAuthenticated: true,
      user: {},
      status: 'rest'
    });

    expect(wrapper.find('#auth-buttons').children()).not.toHaveLength(2);

    expect(toJson(wrapper.find('#auth-buttons').childAt(0))).toBeFalsy();

    expect(toJson(wrapper.find('#auth-buttons').childAt(1))).toBeFalsy();
  });
});
