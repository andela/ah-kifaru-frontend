import articleReducer from '@modules/articles/reducer';

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

describe('Article reducer', () => {
  const initialState = {
    isPending: false,
    isSuccess: false,
    article: {}
  };
  it('should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the pending state', () => {
    const pendingAction = {
      type: 'SINGLE_ARTICLE_PENDING',
      payload: {
        isPending: true
      }
    };
    expect(articleReducer(initialState, pendingAction)).toEqual({
      isPending: true,
      isSuccess: false,
      article: {}
    });
  });

  it('should return the success state', () => {
    const pendingAction = {
      type: 'SINGLE_ARTICLE_SUCCESS',
      payload: {
        isPending: false,
        isSuccess: true,
        article: articleData
      }
    };
    expect(articleReducer(initialState, pendingAction)).toEqual({
      isPending: false,
      isSuccess: true,
      article: articleData
    });
  });

  it('should return the failed state', () => {
    const pendingAction = {
      type: 'SINGLE_ARTICLE_FAILED',
      payload: {
        isPending: false
      }
    };
    expect(articleReducer(initialState, pendingAction)).toEqual({
      isPending: false,
      isSuccess: false,
      article: {}
    });
  });
});
