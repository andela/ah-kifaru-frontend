import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewArticle, { getImage } from './NewArticle';
import Editor, {Description} from './editor';

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
    articleReducer: { ...isLoading }
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

test('getImage function returns the first image in the article', () => {
  const image = getImage(body);
  expect(image).toEqual(url);
});
test('getImage function returns a default image if their are no images in the article', () => {
  const image = getImage(emptyBody);
  expect(image).toEqual(defaulImage);
});
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

describe('', () => {
  let store;
  afterEach(() => cleanup());
  it('should render the title, description, body, tag, draft button and publish button', () => {
    store = createStore(true, false);

    const { getByTestId , getByPlaceholderText, container} = renderComponent(store);
    console.log(container)
    expect(getByTestId('title')).toBeDefined();
    expect(getByTestId('description')).toBeDefined();
    expect(getByTestId('editorjs')).toBeDefined();
    expect(getByTestId('tags')).toBeDefined();
    expect(getByTestId('publish-button')).toBeDefined();
    expect(getByTestId('draft-button')).toBeDefined();
    expect(getByPlaceholderText('Title')).toBeDefined();
    expect(getByPlaceholderText('Add new tag')).toBeDefined();
  });
  it('should redirect to the login page', () => {
    store = createStore(false, false);
    const wrapper = renderComponentEnzyme(store);
    expect(wrapper.find('Redirect')).toBeTruthy();
    expect(wrapper.find('Redirect')).toBeTruthy();
  });

  it('should publish article when the publish button is clicked', () => {
    store = createStore(true, false);
    const  {asFragment, getByTestId} = render(<Provider store={store}><BrowserRouter><NewArticle pusblishArticle={props.pusblishArticle} /></BrowserRouter></Provider>);
    expect(asFragment()).toMatchSnapshot()
    const button = getByTestId('publish-button');
    fireEvent.click(button);
    expect(getByTestId('publish-button')).toBeDefined();
  });

  it('should save article as draft when the draft button is clicked', () => {
    store = createStore(true, false);
    const  {getByTestId, debug} = render(<Provider store={store}><BrowserRouter><NewArticle pusblishArticle={props.pusblishArticle} /></BrowserRouter></Provider>);
    const button = getByTestId('draft-button');
    fireEvent.click(button);
    expect(getByTestId('draft-button')).toBeDefined();

  });
});
