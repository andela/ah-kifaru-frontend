import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import BounceLoader from 'react-spinners/BounceLoader';
import ConnectedLoginForm, { LoginForm as UnconnectedLogin } from './LoginForm';

const createStore = (isAuthenticated = false, user = {}, status = 'rest') => {
  const content = {
    authReducer: {
      isAuthenticated: true,
      user,
      status: 'authenticationSuccess'
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    authReducer: { ...content, isAuthenticated, user, status }
  });
  return store;
};

const props = {
  authAction: jest.fn(),
  status: '',
  isAuthenticated: false,
  error: null,
  location: { url: '/articles' },
  history: { push: jest.fn() }
};

describe('Login Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LoginForm')).toBeTruthy();
    expect(wrapper.find('div')).toBeTruthy();
  });

  it('should render one form', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render 3 input fields', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper.find('input').length).toBe(3);
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().type
    ).toBe('email');
    expect(
      wrapper
        .find('input')
        .at(1)
        .props().type
    ).toBe('password');
    expect(
      wrapper
        .find('input')
        .at(2)
        .props().type
    ).toBe('submit');
  });

  it('should redirect to Article if user is logged in already', () => {
    const wrapper = mount(
      <Provider store={createStore(true, {}, 'authenticationSuccess')}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/articles');
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should redirect to Homepage if user is logged in already', () => {
    props.location.url = null;
    const wrapper = mount(
      <Provider store={createStore(true, {}, 'authenticationSuccess')}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Redirect').length).toBe(1);
    expect(wrapper.find('Redirect').props().to).toBe('/');
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should not render a loading component when status is at rest', () => {
    const wrapper = mount(
      <Provider store={createStore(false, {}, 'rest')}>
        <Router>
          <UnconnectedLogin {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Loader')).toBeTruthy();
    expect(wrapper.find('Loader').props().loading).toBe(false);
  });

  it('should render a loading component when status equals authenticationPending', () => {
    const wrapper = mount(
      <Provider store={createStore(false, {}, 'authenticationPending')}>
        <Router>
          <ConnectedLoginForm {...props} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Loader')).toBeTruthy();
    expect(wrapper.find('Loader').props().loading).toBe(true);
  });

  it('should not submit form when email or pass is empty', () => {
    const wrapper = shallow(<UnconnectedLogin {...props} />);
    const event = {
      preventDefault: jest.fn()
    };

    wrapper.find('form').simulate('submit', event);
    expect(wrapper.state('errors').email).toEqual('Email cannot be empty');
    expect(wrapper.state('errors').password).toEqual(
      'Password cannot be empty'
    );
  });

  it('should submit a valid form', () => {
    const wrapper = shallow(<UnconnectedLogin {...props} />);
    const event = {
      preventDefault: jest.fn()
    };

    const emailInput = wrapper.find("input[name='email']");
    const passwordInput = wrapper.find("input[name='password']");
    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'nkechi@finegal.com'
      }
    });
    passwordInput.simulate('change', {
      target: {
        name: 'password',
        value: 'finegal'
      }
    });
    wrapper.find('form').simulate('submit', event);

    expect(props.authAction).toHaveBeenCalledWith({
      userData: {
        email: 'nkechi@finegal.com',
        password: 'finegal'
      },
      history: props.history,
      url: props.location.url
    });
  });
});
