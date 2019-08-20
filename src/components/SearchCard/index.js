import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SearchIcon } from '../../assets/icons/index';
import './index.css';

export const SearchCard = () => {
  const [userInput, setUserInput] = useState([]);

  const handleChange = e => {
    const { value } = e.target;
    setUserInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    return <Redirect to="/search" state={userInput} />;
  };

  return (
    <div className="flex bg-color header-card w-100 justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-white md:font-extrabold sm:font-bold md:text-4xl sm:text-2xl text-center">
          Your Ideas and thoughts are
        </h1>
        <h2 className="text-white md:font-extrabold sm:font-bold md:text-4xl sm:text-2xl">
          worth sharing.
        </h2>
        <form
          className="search-card-form mt-6 w-10/12 md:w-4/12 text-center flex justify-center items-center bg-white rounded p-2"
          onSubmit={handleSubmit}
        >
          <SearchIcon className="h-9 w-9 px-2" />
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

export default SearchCard;
