import axios from 'axios';

export default () => {
  const BASE_URL = 'https://errorswag-staging.herokuapp.com/api/v1';
  return axios.create({ baseURL: BASE_URL });
};
