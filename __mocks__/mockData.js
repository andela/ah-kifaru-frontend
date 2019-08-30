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
}
export const mockStoreData = {
  commentReducer: {
    comment: [
      {
        id: 1,
        content: 'I am cool actually',
        userId: 1,
        articleId: 1,
        user: { username: 'nkechi', id: 1 }
      }
    ],
    status: 'rest',
    comments: { content: 'I love you' }
  },
  allCommentsData: {
    data: {
      rows: [
        {
          articleId: 55,
          content:
            'Martin Weinberg, an attorney for the financier, did not respond to a request for comment Friday about the documents.↵Martin Weinberg, an attorney for the financier, did not respond to a request for comment Friday about the documents.',
          createdAt: '2019-08-26T05:14:27.383Z',
          id: 68,
          updatedAt: '2019-08-26T05:14:27.383Z',
          user: { id: 162, username: 'onyimatics' },
          userId: 162
        }
      ],
      comments: { content: 'I love you' }
    }
  },
  newCommentData: {
    data: {
      articleId: 55,
      content: 'good',
      createdAt: '2019-08-26T05:14:27.383Z',
      id: 72,
      updatedAt: '2019-08-26T05:14:27.383Z',
      userId: 162
    }
  },
  errorData: {
    message: 'Unable to post'
  }
};
