import axios from 'axios';

const axiosCall = (method, route, data = '') => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  }
  const response = axios({
    method,
    baseURL: `${process.env.API_BASE_URL}/${route}`,
    data
  });
  return response;
};
export default axiosCall;
