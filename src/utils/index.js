import axios from 'axios';
import config from '../config';

export const saveToLocalStorage = user => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const axiosCall = async ({ path, payload, method }) => {
  const url = `${config.apiUrl}${path}`;
  const result = await axios({ method, url, data: { ...payload } });
  const data = result && result.data;
  return data;
};
