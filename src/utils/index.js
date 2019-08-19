import jwtDecode from 'jwt-decode';

export const calculateReadTime = content => {
  const wordsPerMinute = 200;

  const textLength = content.split(' ').length;
  if (textLength > wordsPerMinute) {
    const value = Math.ceil(textLength / wordsPerMinute);
    return `~${value} min read`;
  }
  return 'less than a min read';
};

export const saveToLocalStorage = (token, url) => {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (url) {
    localStorage.setItem('url', url);
  }
};

export const decodeToken = ({ history }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp, iat, ...userData } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return userData;
    }
    return history && history.push('/login');
  }
  return history && history.push('/login');
};
