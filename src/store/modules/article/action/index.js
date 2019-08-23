import axios from 'axios';
import * as toastr from 'toastr';
import { COMPLETE_ARTICLE, PENDING_ARTICLE } from '../articleType';

const moxios = axios.create({ baseURL: process.env.API_BASE_URL });
export const publishArticle = (body, history) => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    token: `${localStorage.getItem('token')}`
  };
  try {
    dispatch({ type: PENDING_ARTICLE, payload: { isLoading: true } });
    const response = await moxios.put('/articles/publish', body, { headers });
    const { data } = response.data;
    dispatch({ type: '' });
    toastr.success('Article has been published');
    setTimeout(() => {
      history.push(`/${data.id}`);
    }, 1000);
  } catch (error) {
    const err =
      error.response === undefined
        ? error.message
        : error.response.data.message;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    dispatch({ type: '' });
    toastr.error(err);
  }
};

export const draftArticle = (body, history) => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    token: `${localStorage.getItem('token')}`
  };
  try {
    dispatch({ type: PENDING_ARTICLE, payload: { isLoading: true } });
    const response = await moxios.post('/articles/', body, { headers });
    const { data } = response.data;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: true } });
    dispatch({ type: '' });
    toastr.success('Article has been saved as draft');
    setTimeout(() => {
      history.push(`/${data.id}`);
    }, 1000);
  } catch (error) {
    const err =
      error.response === undefined
        ? error.message
        : error.response.data.message;
    dispatch({ type: COMPLETE_ARTICLE, payload: { isLoading: false } });
    dispatch({ type: '' });
    toastr.error(err);
  }
};

export const Loading = () => ({
  type: COMPLETE_ARTICLE,
  payload: { isLoading: true }
});

export const Loaded = () => ({
  type: COMPLETE_ARTICLE,
  payload: { isLoading: false }
});
