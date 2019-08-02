import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@modules/resetpassword/actions';
import actionTypes from '@modules/resetpassword/actionTypes';

const {
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
} = actionTypes;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  resetPassword: {
    isPending: false,
    isSuccess: false,
    error: null,
    message: null
  }
});

describe('Test reset password request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Dispatches the PASSWORD_RESET_SUCCESS actions and payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'A link has been sent to your email address'
        }
      });
    });

    const expectedActions = [
      { type: PASSWORD_RESET_PENDING, payload: { isPending: true } },
      {
        type: PASSWORD_RESET_SUCCESS,
        payload: {
          isPending: false,
          isSuccess: true,
          message: 'A link has been sent to your email address'
        }
      }
    ];

    const email = 'timitejumola@gmail.com';
    return store.dispatch(actions.submitRequest(email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Dispatches the PASSWORD_RESET_FAILED actions and payload', () => {
    const errorResp = {
      status: 400,
      response: {
        data: {
          message: 'invalid data'
        }
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errorResp);
    });

    const expectedActions = [
      { type: PASSWORD_RESET_PENDING, payload: { isPending: true } },
      {
        type: PASSWORD_RESET_FAILED,
        payload: {
          isPending: false,
          error: 'invalid data'
        }
      }
    ];
    const email = 'timitejumola@gmail.com';
    return store.dispatch(actions.submitRequest(email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Test reset password actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Dispatches the PASSWORD_RESET_SUCCESS actions and payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'password reset was successful'
        }
      });
    });

    const expectedActions = [
      { type: PASSWORD_RESET_PENDING, payload: { isPending: true } },
      {
        type: PASSWORD_RESET_SUCCESS,
        payload: {
          isPending: false,
          isSuccess: true,
          message: 'password reset was successful'
        }
      }
    ];

    const password = 'password';
    const token = 'dfdjfdjfjdj3rr3r3r3er93';

    return store.dispatch(actions.resetPasword(password, token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Dispatches the PASSWORD_RESET_FAILED actions and payload', () => {
    const errorResp = {
      status: 400,
      response: {
        data: {
          message: 'invalid data'
        }
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errorResp);
    });

    const expectedActions = [
      { type: PASSWORD_RESET_PENDING, payload: { isPending: true } },
      {
        type: PASSWORD_RESET_FAILED,
        payload: { isPending: false, error: 'invalid data' }
      }
    ];
    const password = 'password';
    const token = 'dfdjfdjfjdj3rr3r3r3er93';

    return store.dispatch(actions.resetPasword(password, token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
