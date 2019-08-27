import axios from 'axios';
import * as toastr from 'toastr';
import { COMPLETE_ARTICLE, PENDING_ARTICLE } from '../articleType';

axios.defaults.headers.common.Authorization = JSON.parse(
  localStorage.getItem('token')
);
export const publishArticle = (body, history) => async dispatch => {
  try {
    dispatch({ type: PENDING_ARTICLE, payload: { isLoading: true } });
    const response = await axios.put(
      'https://errorswag-staging.herokuapp.com/api/v1/articles/publish',
      body
    );
    const { data } = response.data;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    toastr.success('Article has been published');
    setTimeout(() => {
      history.push(`/article/${data.id}`);
    }, 1000);
  } catch (error) {
    const err =
      error.response === undefined
        ? error.message
        : error.response.data.message;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    toastr.error(err);
  }
};

export const draftArticle = (body, history) => async dispatch => {
  try {
    dispatch({ type: PENDING_ARTICLE, payload: { isLoading: true } });
    const response = await axios.post(
      'https://errorswag-staging.herokuapp.com/api/v1/articles/',
      body
    );
    const { data } = response.data;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    toastr.success('Article has been saved as draft');
    setTimeout(() => {
      history.push(`/article/${data.id}`);
    }, 1000);
  } catch (error) {
    const err =
      error.response === undefined
        ? error.message
        : error.response.data.message;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    toastr.error(err);
  }
};
