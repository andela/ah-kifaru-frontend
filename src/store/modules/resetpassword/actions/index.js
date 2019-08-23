import client from '@config/client';
import { getErrorResponse, getSuccessResponse } from '@utils/getResponse';
import actionTypes from '../actionTypes';

const {
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
} = actionTypes;

export const resetPasswordPending = () => {
  return {
    type: PASSWORD_RESET_PENDING,
    payload: {
      isPending: true
    }
  };
};

export const resetPasswordSuccess = message => {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload: {
      isPending: false,
      isSuccess: true,
      message
    }
  };
};

export const resetPasswordFailed = message => {
  return {
    type: PASSWORD_RESET_FAILED,
    payload: {
      isPending: false,
      error: message
    }
  };
};

export const submitRequest = email => {
  return async dispatch => {
    dispatch(resetPasswordPending());
    try {
      const response = await client().post('/users/reset-password', {
        email
      });
      const { message } = getSuccessResponse(response);
      dispatch(resetPasswordSuccess(message));
    } catch (error) {
      const message = getErrorResponse(error);
      dispatch(resetPasswordFailed(message));
    }
  };
};

export const resetPasword = (password, token) => {
  return async dispatch => {
    dispatch(resetPasswordPending());
    try {
      const response = await client().put(`/users/reset-password/${token}`, {
        password
      });
      const { message } = getSuccessResponse(response);
      dispatch(resetPasswordSuccess(message));
    } catch (error) {
      const message = getErrorResponse(error);
      dispatch(resetPasswordFailed(message));
    }
  };
};
