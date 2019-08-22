import React from 'react';
import './Banner.scss';
import { SearchIcon } from '@assets/icons/index';

function Banner() {
  return (
    <header className="banner flex justify-center w-full py-8 md:py-16 md:py-8 mb-3 md:mb-6">
      <div className="flex flex-col justify-center items-center md:w-6/12">
        <h1 className="banner-text font-bold md:text-4xl sm:text-xl text-white text-center leading-tight mb-6 px-4">
          Your ideas and thoughts are 
          {' '}
          <br />
          {' '}
worth sharing.
        </h1>
        <div className="flex bg-white md:w-10/12 sm:px-4 py-2 rounded md:text-sm sm:text-xs w-11/12">
          <SearchIcon width="20" />
          <input
            type="search"
            placeholder="Search by authors, interests, title"
            className="search-box w-full px-4 outline-none"
          />
        </div>
      </div>
    </header>
  );
}

export default Banner;
