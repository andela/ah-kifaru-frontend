import jwt from 'jsonwebtoken';

const secret = 'princewill';

export const userToken = `Bearer ${jwt.sign(
  {
    id: 1,
    email: 'example@gmail.com',
    role: 'user',
    status: 'verified'
  },
  secret,
  { expiresIn: '1 hour' }
)}`;

export const expiredToken = `Bearer ${jwt.sign(
  {
    id: 1,
    email: 'example@gmail.com',
    role: 'admin',
    status: 'verified'
  },
  secret,
  { expiresIn: -1 }
)}`;

export default {
  authResponse: {
    data: {
      id: 1,
      username: 'Onyimatics',
      email: 'onyimatics@andela.com',
      role: 'user',
      status: 'verified',
      token: userToken
    }
  }
};

export const article = {
  title: 'Pointing',
  description:
    'Things are going to be fine. All you need to do is stay focused and believe in yourself',
  body:
    'The journey to become world class may be scary and daunting. All you need to do is stay focused and believe in yourself',
  image: 'image',
  authorImage: 'authorImage',
  publishedDate: 'June 25',
  author: 'Mark',
  readTime: '2 mins read'
};
