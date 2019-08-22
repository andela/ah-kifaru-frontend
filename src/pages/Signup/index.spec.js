import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';

import { SignupForm } from './index';

const history = { push: jest.fn() };
const location = { url: '' };
const defaultProps = {
  history,
  location,
  status: 'authenticationLoading',
  SignUp: jest.fn(({ userData = {}, history, location }, callback) => {
    callback({ data: true });
  })
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
    <Provider store={args}>
      <Router>
        <SignupForm {...defaultProps} />
      </Router>
    </Provider>
  );
};

describe('SignupForm User Input Validation', () => {
  afterEach(cleanup);
  test('should have validation error when the username field is touched and blured but input is not valid', async () => {
    const placeholderName = 'Username';
    const { asFragment, getByPlaceholderText, findByTestId } = render(
      renderSignupPage(store)
    );
    const input = getByPlaceholderText(placeholderName);
    expect(asFragment).toMatchSnapshot();
    fireEvent.blur(input);
    const validationErrors = await findByTestId('usernameError');
    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error when the email field is touched and blured but input is not valid', async () => {
    const placeholderName = 'Email Address';
    const { asFragment, getByPlaceholderText, findByTestId } = render(
      renderSignupPage(store)
    );
    const input = getByPlaceholderText(placeholderName);
    expect(asFragment).toMatchSnapshot();
    fireEvent.blur(input);
    const validationErrors = await findByTestId('emailError');
    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error when the password field is touched and blured but input is not valid', async () => {
    const placeholderName = 'Password';
    const { asFragment, getByPlaceholderText, findByTestId } = render(
      renderSignupPage(store)
    );
    const input = getByPlaceholderText(placeholderName);
    expect(asFragment).toMatchSnapshot();
    fireEvent.blur(input);
    const validationErrors = await findByTestId('passwordError');
    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error when the confirm Password field is touched and blured but input is not valid', async () => {
    const placeholderName = 'Confirm Password';
    const { asFragment, getByPlaceholderText, findByTestId } = render(
      renderSignupPage(store)
    );
    const input = getByPlaceholderText(placeholderName);
    expect(asFragment).toMatchSnapshot();
    fireEvent.blur(input);
    const validationErrors = await findByTestId('confirmPasswordError');
    expect(validationErrors.innerHTML).toBe('Required');
  });
});
