import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './index';
import store from '../../store/index';

const history = { push: jest.fn() };
const status = '';
const fetchArticles = jest.fn(() => {
  return [
    { id: 1, description: 'we are here', body: '' },
    { id: 2, description: 'we are here', body: '' },
    { id: 3, description: 'we are here', body: '' }
  ];
});

describe('Landing Page', () => {
  test('should render landing page', () => {
    const defaultProps = {
      fetchArticles,
      status
    };
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment).toMatchSnapshot();
  });

  test('landing page should render loading if fetch articles status is fetchPending', () => {
    const defaultProps = {
      fetchArticles,
      status: 'fetchPending'
    };
    const { asFragment, getByTestId, debug } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('pageLoading')).toBeTruthy();

    expect(asFragment).toMatchSnapshot();
  });
});
