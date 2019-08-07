import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.scss';
import { SearchIcon } from '@assets/icons/index';

function Banner() {
  return (
    <div className="banner flex justify-center w-full py-16">
      <div className="flex flex-col justify-center items-center w-6/12">
        <h1 className="banner-text font-bold text-4xl text-white text-center leading-tight mb-6">
          Your ideas and thoughts are worth sharing.
        </h1>

        <div className="flex bg-white w-10/12 px-4 py-2 rounded">
          <SearchIcon width="20" />
          <input
            type="search"
            placeholder="Search by authors, interests, title"
            className="search-box w-full px-4 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
