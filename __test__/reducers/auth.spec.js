import auth from '@modules/auth/reducer';

describe('Test auth reducer function', () => {
  const initialState = {
    isLoginPending: true,
    isAuthenticated: false,
    user: {}
  };
  it('should return the initial state', () => {
    expect(auth(initialState, {})).toEqual(initialState);
  });

  it('should handle successful login', () => {
    const successAction = {
      type: 'LOGIN_SUCCESS',
      user: {
        username: 'timi'
      }
    };
    expect(auth(initialState, successAction)).toEqual({
      isLoginPending: false,
      isAuthenticated: !successAction.user,
      user: successAction.user
    });
  });
});
