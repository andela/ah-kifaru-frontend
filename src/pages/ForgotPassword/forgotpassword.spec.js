import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestPasswordResetPage, {
  validateEmail
} from '@pages/ForgotPassword/index';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  waitForDomChange,
  cleanup,
  wait
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
  handleSubmit: jest.fn()
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
          <RequestPasswordResetPage {...props} />
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
            <RequestPasswordResetPage {...props} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ),
    store
  };
};

describe('Test forgot password page', () => {
  afterEach(cleanup);

  it('should have a email address field', () => {
    const wrapper = renderWithEnzymes(initialSate);
    const field = wrapper.find('input').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('email');
  });

  it('should have a submit button', () => {
    const wrapper = renderWithEnzymes();
    const button = wrapper.find("button[type='submit']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual('REQUEST PASSWORD RESET');
  });

  it('should render forgot password page', () => {
    const wrapper = renderWithEnzymes(initialSate);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update password field on change', () => {
    const wrapper = renderWithEnzymes(initialSate);
    const passwordInput = wrapper.find("input[name='email']");
    passwordInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'tejumoladavidd@gmail.com'
      }
    });
    expect(passwordInput.html()).toMatch('tejumoladavidd@gmail.com');
  });

  test('should submit a valid form', async () => {
    const { getByTestId, findByText } = renderWithRTL(initialSate);

    const emailInputElement = getByTestId('email');
    fireEvent.change(emailInputElement, {
      target: { value: 'tejumoladavidd@gmail.com' }
    });
    fireEvent.blur(emailInputElement);

    const formNode = getByTestId('submit-form');
    fireEvent.submit(formNode);

    await waitForDomChange(() => {
      const submitting = findByText('SUBMITTING');
      expect(submitting).toBeTruthy();
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });

  it('should test the validate method if email is invalid', () => {
    expect(validateEmail('tejumoladavid')).toEqual('Invalid email address');
  });

  it('should test the validate method if email address is null', () => {
    expect(validateEmail(null)).toEqual('Email address is required');
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
      message:
        'A PASSWORD RESET LINK WOULD BE SENT TO THE EMAIL PROVIDED IF IT IS ASSOCIATED WITH A REGISTERED EMAIL'
    });
    expect(wrapper.find('SuccessContainer')).toBeTruthy();
  });

  it('should render message if there is a server error', async () => {
    const { getByTestId } = renderWithRTL({
      isPending: false,
      isSuccess: false,
      error: 'The user with email address does not exist',
      message: null
    });
    const errorElement = getByTestId('server-error');
    expect(errorElement.innerHTML).toMatch(
      /The user with email address does not exist/
    );
  });

  it('should render an error if password is less than 8 characters', async () => {
    const { getByTestId } = renderWithRTL(initialSate);

    const emailInputElement = getByTestId('email');
    fireEvent.change(emailInputElement, { target: { value: 'tejumoladavid' } });
    fireEvent.blur(emailInputElement);
    await waitForDomChange(() => {
      const validationErrors = getByTestId('email-error');
      expect(validationErrors.innerHTML).toMatch(/Invalid email address/);
    });
  });
});
