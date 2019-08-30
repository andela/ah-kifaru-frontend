import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SearchIcon } from '../../assets/icons/index';
import './index.css';

export const SearchPageCard = ({ searchAction }) => {
  const [userInput, setUserInput] = useState([]);

  /* istanbul ignore next */
  const handleChange = e => {
    const { value } = e.target;
    /* istanbul ignore next */
    setUserInput(value);
  };

  /* istanbul ignore next */
  const handleSubmit = e => {
    e.preventDefault();
    /* istanbul ignore next */
    searchAction({ searchParameter: userInput });
  };

  return (
    <div className="flex bg-color h-64 header-card w-100 justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full p-4">
        <form
          className="search-card-form mt-6 w-10/12 md:w-6/12 text-center flex justify-center items-center bg-white rounded pr-2"
          onSubmit={handleSubmit}
        >
          <SearchIcon className="h-8 w-8 px-2" />
          <input
            placeholder="Search by author, interest, and title"
            className="w-full h-10 rounded text-sm outline-none"
            onChange={handleChange}
            type="text"
            data-testid="searchInput"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchPageCard;
