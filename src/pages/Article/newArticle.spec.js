import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewArticle, { getImage } from './NewArticle';

const createStore = (isAuthenticated = false, isLoading = false) => {
  const content = {
    authReducer: {
      isAuthenticated: true
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    authReducer: {
      ...content,
      isAuthenticated
    },
    createArticleReducer: {
      ...isLoading
    }
  });
  return store;
};
const props = {
  pusblishArticle: jest.fn(),
  draftArticle: jest.fn(),
  tags: [{ id: 'articletag', text: 'articletag' }]
};
const body = {
  blocks: [{ type: 'image', data: { file: { url: 'https://google.com' } } }]
};
const emptyBody = { blocks: [] };
const {
  file: { url }
} = body.blocks[0].data;
const defaulImage = getImage(emptyBody);

const renderComponent = store => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <NewArticle {...props} />
      </BrowserRouter>
    </Provider>
  );
};
const renderComponentEnzyme = store => {
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <NewArticle {...props} />
      </BrowserRouter>
    </Provider>
  );
};

describe('getImage function', () => {
  it('should return the first image in the article', () => {
    const image = getImage(body);
    expect(image).toEqual(url);
  });
  it('should return a default image if their are no images in the article', () => {
    const image = getImage(emptyBody);
    expect(image).toEqual(defaulImage);
  });
});
describe('NewArticle', () => {
  let store;
  afterEach(() => cleanup());
  it('should render the title, description, body, tag, draft button and publish button', () => {
    store = createStore(true, false);
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('title')).toBeDefined();
    expect(getByTestId('description')).toBeDefined();
    expect(getByTestId('editorjs')).toBeDefined();
    expect(getByTestId('tags')).toBeDefined();
    expect(getByTestId('publish-button')).toBeDefined();
    expect(getByTestId('draft-button')).toBeDefined();
  });
  it('should redirect to the login page if the user is not logged in', () => {
    store = createStore(false, false);
    const wrapper = renderComponentEnzyme(store);
    expect(wrapper.find('Redirect')).toBeTruthy();
    expect(wrapper.find('Redirect').props().to).toEqual('/login');
  });
});
