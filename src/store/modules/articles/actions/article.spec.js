import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@modules/articles/actions';
import actionTypes from '@modules/articles/actionTypes';

const articleData = {
  id: 35,
  title: 'Testing a React-Redux app using Jest and Enzyme',
  image:
    'To make moxios work,you need to add the beforeEach and afterEachfunctions installing and unistalling for each test suite.Inside the test',
  description:
    '{"time":1567080801805,"blocks":[{"type":"paragraph","data":{"text":"3"}}],"version":"2.15.0"}',
  body:
    '{"time":1567080801804,"blocks":[{"type":"image","data":{"file":{"url":"http://res.cloudinary.com/dmsohf8ul/image/upload/v1567080701/kifaru/nydtev38zqbuizshrwim.jpg"},"caption":"LMS","withBorder":false,"stretched":false,"withBackground":false}},{"type":"paragraph","data":{"text":"1"}},{"type":"paragraph","data":{"text":"1"}},{"type":"header","data":{"text":"&nbsp;","level":2}},{"type":"list","data":{"style":"ordered","items":["I wanted some framework which&nbsp;could be easily setup&nbsp;and start testing. i.e spend minimum time to setup the framework for my project.","Ability to run tests in parallel. This is where Mocha loses the battle for me. Well for this example running the tests in parallel is trivial. But for a huge app with lot of tests, it will be quick if the tests could run in parallel.","Snapshot testing. This is a really cool feature I like. This helps me in reducing the number of tests I have to write as I just create a snapshot and if anything changes in my component, I will get an error when the snapshot is generated the next time.","Jest uses&nbsp;Jasmine for assertion&nbsp;and since I have used Jasmine earlier, it was easy to write tests for me.","Code coverage&nbsp;is available right out of the box.","In-built Manual mocking&nbsp;(Haven’t tried yet)"]}},{"type":"image","data":{"file":{"url":"http://res.cloudinary.com/dmsohf8ul/image/upload/v1567080796/kifaru/qqeuo2eweljkzjmmwxad.jpg"},"caption":"","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.15.0"}',
  publishedDate: '2019-08-29T12:13:23.255Z',
  tags: ['programming', 'tdd', 'jvascript'],
  username: 'mikel',
  avatar: null,
  avg_rating: null,
  count_rating: '0'
};

const {
  SINGLE_ARTICLE_PENDING,
  SINGLE_ARTICLE_SUCCESS,
  SINGLE_ARTICLE_FAILED
} = actionTypes;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  articleReducer: {
    isPending: false,
    isSuccess: false,
    article: {}
  }
});

describe('Test single article page actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Dispatches the SINGLE_ARTICLE_SUCCESS actions and payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
            data: [articleData]
        }
      });
    });

    const expectedActions = [
      { type: SINGLE_ARTICLE_PENDING, payload: { isPending: true } },
      {
        type: SINGLE_ARTICLE_SUCCESS,
        payload: {
          isPending: false,
          isSuccess: true,
          article: articleData
        }
      }
    ];
    const articleId = 35;
    console.log(actions.fetchArticle(articleId));
    return store.dispatch(actions.fetchArticle(articleId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Dispatches the SINGLE_ARTICLE_FAILED actions and payload', () => {
    const errorResp = {
      status: 400,
      response: {
        data: {
          message: 'cannot fetch article'
        }
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errorResp);
    });

    const expectedActions = [
      { type: SINGLE_ARTICLE_PENDING, payload: { isPending: true } },
      {
        type: SINGLE_ARTICLE_FAILED,
        payload: {
          isPending: false
        }
      }
    ];
    const articleId = 35;
    return store.dispatch(actions.fetchArticle(articleId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
