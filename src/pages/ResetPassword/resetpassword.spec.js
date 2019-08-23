import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PasswordResetPage from '@pages/ResetPassword/index';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  waitForDomChange,
  cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore([thunk]);
let store;
const initialSate = {
  isPending: false,
  isSuccess: false,
  error: null,
  message: null
};

const props = {
  isLoading: false,
  showSuccess: false,
  errorMessage: null,
  successMessage: null,
  handleSubmit: jest.fn(() => {}),
  match: {
    params: {
      token: 'gghggg'
    }
  },
  history: {
    push: jest.fn(() => {})
  }
};

const renderWithEnzymes = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: false,
      user: {},
      status: 'rest'
    },
    resetPassword: {
      ...state
    }
  });
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PasswordResetPage {...props} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

const renderWithRTL = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: false,
      user: {},
      status: 'rest'
    },
    resetPassword: {
      ...state
    }
  });
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PasswordResetPage {...props} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ),
    store
  };
};

describe('Test reset password page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store = null;
  }, cleanup);

  it('should have a password field', () => {
    const wrapper = renderWithEnzymes();
    const field = wrapper.find('input').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('password');
  });

  it('should have a confirm password field', () => {
    const wrapper = renderWithEnzymes();
    const field = wrapper.find('input').at(1);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('confirmpassword');
  });

  it('should have a submit button', () => {
    const wrapper = renderWithEnzymes();
    const button = wrapper.find("button[type='submit']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual('RESET PASSWORD');
  });

  it('should render reset password page', () => {
    const wrapper = renderWithEnzymes();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update password field on change', () => {
    const wrapper = renderWithEnzymes();
    const passwordInput = wrapper.find("input[name='password']");
    passwordInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'password',
        value: 'Password9595!'
      }
    });
    expect(passwordInput.html()).toMatch('Password9595!');
  });

  it('should update confirm password field on change', () => {
    const wrapper = renderWithEnzymes();
    const passwordInput = wrapper.find("input[name='confirmpassword']");
    passwordInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'confirmpassword',
        value: 'Password9595!'
      }
    });
    expect(passwordInput.html()).toMatch('Password9595!');
  });

  it('should render loader when isPending is true', () => {
    const wrapper = renderWithEnzymes({
      isPending: true,
      isSuccess: false,
      error: null,
      message: null
    });
    expect(wrapper.find('SyncLoader')).toBeTruthy();
  });

  it('should render success component when showSucess is true', () => {
    const wrapper = renderWithEnzymes({
      isPending: false,
      isSuccess: true,
      error: null,
      message: 'PASSWORD RESET SUCCESSFUL'
    });
    expect(wrapper.find('SuccessContainer')).toBeTruthy();
  });

  it('should render error when their is an error in the state', async () => {
    const { getByTestId } = renderWithRTL({
      isPending: false,
      isSuccess: false,
      error: 'Bad Request',
      message: null
    });
    const errorElement = getByTestId('server-error');
    expect(errorElement.innerHTML).toMatch(/Bad Request/);
  });

  it('should submit a valid form', async () => {
    const { getByTestId, findByText } = renderWithRTL(initialSate);

    const passwordInputElement = getByTestId('password');
    fireEvent.change(passwordInputElement, {
      target: { value: 'Password9595!' }
    });

    const confirmPasswordInputElement = getByTestId('confirmpassword');
    fireEvent.change(confirmPasswordInputElement, {
      target: { value: 'Password9595!' }
    });

    fireEvent.blur(confirmPasswordInputElement);

    const formNode = getByTestId('submit-form');
    fireEvent.submit(formNode);

    await waitForDomChange(() => {
      const submitting = findByText('SUBMITTING');
      expect(submitting).toBeTruthy();
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });

  it('should render an error message when password is less than 8 characters', async () => {
    const { getByTestId } = renderWithRTL(initialSate);

    const passwordInputElement = getByTestId('password');
    fireEvent.change(passwordInputElement, { target: { value: 'Pas!' } });
    fireEvent.blur(passwordInputElement);
    await waitForDomChange();
    const validationErrors = getByTestId('password-error');
    expect(validationErrors.innerHTML).toMatch(
      /password should be a minimun of 8 characters/
    );
  });

  it('should render an error message when password does not match confirm password', async () => {
    const { getByTestId } = renderWithRTL(initialSate);

    const passwordInputElement = getByTestId('password');
    fireEvent.change(passwordInputElement, {
      target: { value: 'Password9595!' }
    });

    const confirmPasswordInputElement = getByTestId('confirmpassword');
    fireEvent.change(confirmPasswordInputElement, {
      target: { value: 'Passw9595!' }
    });

    fireEvent.blur(confirmPasswordInputElement);

    await waitForDomChange(() => {
      const validationErrors = getByTestId('confirmpassword-error');
      expect(validationErrors.innerHTML).toMatch(/Passwords must match/);
    });
  });
});
