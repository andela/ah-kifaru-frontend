import React from 'react';
import { mount, shallow } from 'enzyme';
import { Formik, Form, Field } from 'formik';
import store from '../../store';
import MySignupForm, { SignupForm } from './index';

describe('SignupForm', () => {
  test('should update email field on change', () => {
    const tree = mount(<MySignupForm store={store} />);
    const emailInput = tree.find("input[name='email']");
    emailInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'email@gmail.com'
      }
    });
    expect(emailInput.html()).toMatch('email@gmail.com');
  });

  test('should update username field on change', () => {
    const tree = mount(<MySignupForm store={store} />);

    const usernameInput = tree.find("input[name='username']");

    usernameInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'username',
        value: 'newName'
      }
    });

    expect(usernameInput.html()).toMatch('newName');
  });

  test('should update password field on change', () => {
    const tree = mount(<MySignupForm store={store} />);

    const passwordInput = tree.find("input[name='password']");

    passwordInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'password',
        value: 'Password2019#'
      }
    });

    expect(passwordInput.html()).toMatch('Password2019#');
  });

  test('should submit a valid form', () => {
    const tree = shallow(<MySignupForm store={store} />);

    const signupForm = (props = { errors: {} }) =>
      tree
        .find(SignupForm)
        .dive()
        .find(Formik)
        .renderProp('children')(props);

    // expect
    const signingUpForm = signupForm({ errors: {}, isSubmitting: true });
    expect(signingUpForm.html()).toMatch(/SIGNING UP/);
  });

  test('should return error for invalid email address', () => {
    const tree = shallow(<MySignupForm store={store} />);

    const signupForm = (props = { errors: {} }) =>
      tree
        .find(SignupForm)
        .dive()
        .find(Formik)
        .renderProp('children')(props);

    const formWithInvalidEmailErrors = signupForm({
      errors: {
        email: 'Invalid Email Address'
      },
      touched: { email: true },
      isSubmitting: false
    });

    expect(formWithInvalidEmailErrors.html()).toMatch(/Invalid Email Address/);
  });

  test('should return error if the username is not complete', () => {
    const tree = shallow(<MySignupForm store={store} />);

    const signupForm = (props = { errors: {} }) =>
      tree
        .find(SignupForm)
        .dive()
        .find(Formik)
        .renderProp('children')(props);

    const formWithInvalidUsernamelErrors = signupForm({
      errors: {
        username: 'minumum of 6 characters'
      },
      touched: { username: true },
      isSubmitting: false
    });

    expect(formWithInvalidUsernamelErrors.html()).toMatch(
      /minumum of 6 characters/
    );
  });

  test('should return error if there is password validation error', () => {
    const tree = shallow(<MySignupForm store={store} />);

    const signupForm = (props = { errors: {} }) =>
      tree
        .find(SignupForm)
        .dive()
        .find(Formik)
        .renderProp('children')(props);

    const formWithPAsswordErrors = signupForm({
      errors: {
        password:
          'Password must contain atleast one special character and uppercase letter'
      },
      touched: { password: true },
      isSubmitting: false
    });

    // console.log()
    expect(formWithPAsswordErrors.html()).toMatch(
      /Password must contain atleast one special character and uppercase letter/
    );
  });
});
