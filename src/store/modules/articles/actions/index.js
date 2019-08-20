import client from '@config/client';
import { getErrorResponse, getSuccessResponse } from '@utils/getResponse';
import * as Toastr from 'toastr';
import actionTypes from '../actionTypes';

const {
  SINGLE_ARTICLE_PENDING,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAILED,
  REQUIRE_LOGIN
} = actionTypes;

export const requestArticlePending = () => {
  return {
    type: SINGLE_ARTICLE_PENDING,
    payload: {
      isPending: true
    }
  };
};

export const requestArticleSuccess = article => {
  return {
    type: SINGLE_ARTICLE_SUCCESS,
    payload: {
      isPending: false,
      isSuccess: true,
      article
    }
  };
};

export const requestArticleFailed = () => {
  return {
    type: SINGLE_ARTICLE_FAILED,
    payload: {
      isPending: false
    }
  };
};

export const fetchArticle = id => {
  return async dispatch => {
    dispatch(requestArticlePending());
    try {
      const response = await client().get(`/articles/${id}`);
      const { data } = getSuccessResponse(response);
      dispatch(requestArticleSuccess(data[0]));
    } catch (error) {
      const message = getErrorResponse(error);
      Toastr.error(message);
      dispatch(requestArticleFailed());
    }
  };
};




// export const follow = (isFollow, id) => {
//   return async dispatch => {
//     try {

//       if(isFollow) {
//         const response = await client().patch(`/users/follow/`,{
//         followeeId: id
//         });
//       }
//       const { data } = getSuccessResponse(response);
//       dispatch(requestArticleSuccess(data[0]));
//     } catch (error) {
//       const message = getErrorResponse(error);
//       Toastr.error(message);
//       dispatch(requestArticleFailed());
//     }
//   };
// };
