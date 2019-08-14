import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar, { AuthButtons } from '@components/NavBar';

const mockState = menuOpen => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(() => [true, setState]);
};

describe('<NavBar />', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test when user is not logged in and menu is clicked', () => {
    mockState(false);
    wrapper = mount(
      <Router>
        <NavBar isLoggedIn={false} />
      </Router>
    );
    wrapper.find('#hamburger').simulate('click');
    mockState(true);
    expect(wrapper.find('#hamburger').hasClass('active')).toEqual(true);
  });

  it('should test when user is logged in', () => {
    wrapper = mount(
      <Router>
        <NavBar isLoggedIn />
      </Router>
    );
    expect(
      wrapper
        .find('#menu')
        .childAt(0)
        .hasClass('avatar')
    ).toEqual(true);
  });

  it('should display auth button when user is not logged in ', () => {
    wrapper = mount(
      <Router>
        <NavBar isLoggedIn />
      </Router>
    );
    expect(
      wrapper
        .setProps({
          children: <AuthButtons id="auth-buttons" show />
        })
        .find('#auth-buttons')
        .children()
    ).toHaveLength(2);

    expect(
      toJson(
        wrapper
          .setProps({
            children: <AuthButtons id="auth-buttons" show />
          })
          .find('#auth-buttons')
          .childAt(0)
      ).props.title
    ).toEqual('Login');

    expect(
      toJson(
        wrapper
          .setProps({
            children: <AuthButtons id="auth-buttons" show />
          })
          .find('#auth-buttons')
          .childAt(1)
      ).props.title
    ).toEqual('Signup');
  });
});
