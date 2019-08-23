import resetPassword from '@modules/resetpassword/reducer';

describe('Test auth reducer function', () => {
  const initialState = {
    isPending: false,
    isSuccess: false,
    error: null,
    message: null
  };
  it('should return the initial state', () => {
    expect(resetPassword(undefined, {})).toEqual(initialState);
  });

  it('should return the pending state', () => {
    const pendingAction = {
      type: 'PASSWORD_RESET_PENDING',
      payload: {
        isPending: true
      }
    };
    expect(resetPassword(initialState, pendingAction)).toEqual({
      isPending: true,
      isSuccess: false,
      error: null,
      message: null
    });
  });

  it('should return the success state', () => {
    const pendingAction = {
      type: 'PASSWORD_RESET_SUCCESS',
      payload: {
        isPending: false,
        isSuccess: true,
        message: 'A link has been sent to your email address'
      }
    };
    expect(resetPassword(initialState, pendingAction)).toEqual({
      isPending: false,
      isSuccess: true,
      error: null,
      message: 'A link has been sent to your email address'
    });
  });

  it('should return the failed state', () => {
    const pendingAction = {
      type: 'PASSWORD_RESET_FAILED',
      payload: {
        isPending: false,
        error: 'with error message'
      }
    };
    expect(resetPassword(initialState, pendingAction)).toEqual({
      isPending: false,
      isSuccess: false,
      error: 'with error message',
      message: null
    });
  });
});
