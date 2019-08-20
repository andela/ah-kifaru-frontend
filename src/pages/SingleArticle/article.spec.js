import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SingleArticlePage from '@pages/SingleArticle';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const articleData = {
  id: '35',
  title: 'Testing a React-Redux app using Jest and Enzyme',
  image:
    'https://res.cloudinary.com/betachop/image/upload/v1567048941/errorswag/1_Dke-e3NsRO4Y5UqFgj1qAg.png',
  description:
    'To make moxios work,you need to add the beforeEach and afterEachfunctions installing and unistalling for each test suite.Inside the test',
  body:
    '{"time":1567080801804,"blocks":[{"type":"image","data":{"file":{"url":"http://res.cloudinary.com/dmsohf8ul/image/upload/v1567080701/kifaru/nydtev38zqbuizshrwim.jpg"},"caption":"LMS","withBorder":false,"stretched":false,"withBackground":false}},{"type":"paragraph","data":{"text":"1"}},{"type":"paragraph","data":{"text":"1"}},{"type":"header","data":{"text":"&nbsp;","level":2}},{"type":"list","data":{"style":"ordered","items":["I wanted some framework which&nbsp;could be easily setup&nbsp;and start testing. i.e spend minimum time to setup the framework for my project.","Ability to run tests in parallel. This is where Mocha loses the battle for me. Well for this example running the tests in parallel is trivial. But for a huge app with lot of tests, it will be quick if the tests could run in parallel.","Snapshot testing. This is a really cool feature I like. This helps me in reducing the number of tests I have to write as I just create a snapshot and if anything changes in my component, I will get an error when the snapshot is generated the next time.","Jest uses&nbsp;Jasmine for assertion&nbsp;and since I have used Jasmine earlier, it was easy to write tests for me.","Code coverage&nbsp;is available right out of the box.","In-built Manual mocking&nbsp;(Haven’t tried yet)"]}},{"type":"image","data":{"file":{"url":"http://res.cloudinary.com/dmsohf8ul/image/upload/v1567080796/kifaru/qqeuo2eweljkzjmmwxad.jpg"},"caption":"","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.15.0"}',
  publishedDate: '2019-08-29T12:13:23.255Z',
  tags: ['programming', 'tdd', 'jvascript'],
  username: 'mikel',
  avatar: null,
  avg_rating: null,
  count_rating: '0'
};

const mockStore = configureMockStore([thunk]);
let store;

const initialSate = {
  isPending: false,
  isSuccess: false,
  article: {}
};

const props = {
  isLoading: false,
  isSuccess: true,
  article: articleData,
  match: {
    params: {
      articleId: '35'
    }
  },
  history: {
    push: jest.fn(() => {})
  }
};

const renderWithRTL = state => {
  store = mockStore({
    articleReducer: {
      ...state
    },
    authReducer: {
      isAuthnticated: false
    }
  });
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <SingleArticlePage {...props} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ),
    store
  };
};

describe('Test single article page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store = null;
  }, cleanup);

  it('it should render Single Article Page without crashing', () => {
    const { container } = renderWithRTL(initialSate);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('it should render title and  description of an article', () => {
    const { getByText } = renderWithRTL({
      isPending: false,
      isSuccess: true,
      article: articleData
    });
    expect(getByText(articleData.title)).toBeInTheDocument();
    expect(getByText(articleData.description)).toBeInTheDocument();
  });

  it('it should render image banner of an article', () => {
    const { getByTestId } = renderWithRTL({
      isPending: false,
      isSuccess: true,
      article: articleData
    });
    const bannerImageElement = getByTestId('banner');
    expect(bannerImageElement.getAttribute('src')).toEqual(articleData.image);
  });

  //
  it('it should render tags an article', () => {
    const { getByTestId } = renderWithRTL({
      isPending: false,
      isSuccess: true,
      article: articleData
    });
    const tagsElement = getByTestId('tags');
    expect(tagsElement.children.length).toBe(3);
    expect(tagsElement.children[0].textContent).toEqual('programming');
    expect(tagsElement.children[1].textContent).toEqual('tdd');
    expect(tagsElement.children[2].textContent).toEqual('jvascript');
  });

  it('it should render article as draft when publish date is null', () => {
    const { getByTestId } = renderWithRTL({
      isPending: false,
      isSuccess: true,
      article: {
        ...articleData,
        publishedDate: null
      }
    });
    const element = getByTestId('publish-date');
    expect(element.textContent).toEqual('Draft');
  });
});
