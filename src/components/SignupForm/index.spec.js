import React from 'react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SignupFormComponent } from './index';

const history = { push: jest.fn() };
const location = { url: '' };
const defaultProps = {
  history,
  location,
  status: 'authenticationLoading',
  signUp: jest.fn(() => {})
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

const renderSignupPage = args => {
  const props = { ...args };

  return (
    <MemoryRouter>
      <SignupFormComponent {...defaultProps} />
    </MemoryRouter>
  );
};

describe('SignupForm Validation Succes', () => {
  afterEach(cleanup);

  test('simulate form submission with valid form input', async () => {
    const {
      asFragment,
      getByPlaceholderText,
      getByTestId,
      getByText,
      findByText
    } = render(renderSignupPage(store));

    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(usernameInput, {
      target: { value: 'tolumide_ng' }
    });
    fireEvent.blur(usernameInput);

    fireEvent.change(emailInput, {
      target: { value: 'tolumide@papaafrica.com' }
    });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, {
      target: { value: 'Password2019#' }
    });
    fireEvent.blur(passwordInput);

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password2019#' }
    });
    fireEvent.blur(confirmPasswordInput);

    expect(asFragment).toMatchSnapshot();

    const submitForm = getByText('SIGN UP');
    fireEvent.submit(submitForm);

    const submitFormChange = await findByText('SIGNING UP');
    expect(submitFormChange).toBeTruthy();
    expect(defaultProps.signUp).toHaveBeenCalled();
  });
});
