import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CommentsCard from '@components/Comments/index';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  waitForDomChange,
  cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreateComments } from './CreateComments';

const mockStore = configureMockStore([thunk]);
let store;
const initialSate = {
  comments: [],
  error: null,
  status: 'rest'
};

const props = {
  isAuthenticated: true,
  match: {
    params: {
      articleId: 55
    }
  },
  getComment: jest.fn()
};

const renderWithEnzymes = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: false,
      user: {},
      status: 'rest'
    },
    commentReducer: {
      comments: [],
      error: null,
      status: 'rest'
    },
    commentsCard: {
      ...state
    }
  });
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <CommentsCard {...props} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

const renderWithRTL = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: false,
      user: {},
      status: 'rest'
    },
    commentReducer: {
      comments: [],
      error: null,
      status: 'rest'
    },
    commentsCard: {
      ...state
    }
  });
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <CommentsCard {...props} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ),
    store
  };
};

describe('CommentsCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store = null;
  }, cleanup);

  it('should render comment buttons', () => {
    const renderComponent = () => {
      return render(
        <BrowserRouter>
          <Switch>
            <CreateComments {...props} />
          </Switch>
        </BrowserRouter>
      );
    };
    const { getByTestId } = renderComponent(initialSate);
    expect(getByTestId('button')).toBeDefined();
    expect(getByTestId('submit')).toBeDefined();
    expect(getByTestId('commentButtons')).toBeDefined();
  });

  it('should have a textfield', () => {
    const wrapper = renderWithEnzymes();
    const field = wrapper.find('textarea').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('content');
  });

  it('should have a send submit button', () => {
    const wrapper = renderWithEnzymes();
    const button = wrapper.find("button[type='submit']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual('SEND');
  });

  it('should have a clear button', () => {
    const wrapper = renderWithEnzymes();
    const button = wrapper.find("button[type='button']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual('CLEAR');
  });

  it('should render CommentsCard Component', () => {
    const wrapper = renderWithEnzymes();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update comment field on change', () => {
    const wrapper = renderWithEnzymes();
    const commentInput = wrapper.find("textarea[name='content']");
    commentInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'content',
        value: 'I love you!'
      }
    });
    expect(commentInput.html()).toMatch('I love you!');
  });
  it('should post comment field on submit', () => {
    const wrapper = renderWithEnzymes();
    const event = {
      preventDefault: jest.fn()
    };
    const commentInput = wrapper.find("textarea[name='content']");
    commentInput.simulate('click', {
      persist: () => {},
      target: {
        name: 'content',
        value: 'I love you!'
      }
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.find('CommentsCard').state('content')).toEqual('');
  });

  it('should clear the textarea on clear button', () => {
    const wrapper = renderWithEnzymes();
    const commentInput = wrapper.find("textarea[name='content']");
    commentInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'content',
        value: ''
      }
    });
    wrapper.find('form').simulate('submit');
    expect(commentInput.html()).toMatch('');
    expect(wrapper.find('CommentsCard').state('content')).toEqual('');
  });

  it('should submit a valid form', async () => {
    const { getByTestId, findByText } = renderWithRTL(initialSate);

    const commentInput = getByTestId('content');
    fireEvent.change(commentInput, {
      target: { value: 'I love you' }
    });

    const formNode = getByTestId('submit-form');
    fireEvent.submit(formNode);

    await waitForDomChange(() => {
      const send = findByText('SEND');
      expect(send).toBeTruthy();
      expect(props.handleCommentSubmit).toHaveBeenCalled();
    });
  });
});
