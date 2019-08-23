import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => (
  <ul className="absolute right-0 top-0 mt-14 p-5  shadow-lg bg-white z-10 block text-left w-100 menu">
    <Link className="px-2 py-1" to="/newArticle">
      <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black-600 hover:text-gray-800 hover:bg-gray-100">
        <span>Create Article</span>
      </li>
    </Link>
    <Link className="px-2 py-1" to="/">
      <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
        <span>My Profile</span>
      </li>
    </Link>
    <Link className="px-2 py-1" to="/">
      <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
        <span>Admin Management</span>
      </li>
    </Link>
    <Link className="px-2 py-1" to="/">
      <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black  hover:text-gray-800 hover:bg-gray-100">
        <span>Logout</span>
      </li>
    </Link>
  </ul>
);

export default Menu;
