import React from 'react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SearchCard } from './index';

// const handleSearch = jest.fn();
const defaultProps = {
  handleSearch: jest.fn()
};

const renderSearchCard = args => {
  const props = { ...args };
  return (
    <MemoryRouter>
      <SearchCard {...defaultProps} />
    </MemoryRouter>
  );
};

describe.only('Search Bar', () => {
  afterEach(cleanup);

  test('changes in input field text when user types', async () => {
    const { asFragment, getByTestId, getByText, findByText } = render(
      <SearchCard {...defaultProps} />
    );

    const searchInputField = getByTestId('searchInput');
    fireEvent.change(searchInputField, {
      target: { value: 'tolumide-ng' }
    });

    fireEvent.keyDown(searchInputField, { key: 'Enter', code: 13 });
    // expect(defaultProps.handleSearch).toHaveBeenCalled();
    expect(asFragment).toMatchSnapshot();
  });
});
