import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => (
  <ul className="absolute right-0 top-0 mt-14 p-5  shadow-lg bg-white z-10 block text-left w-100 menu">
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black-600 hover:text-gray-800 hover:bg-gray-100">
      <Link className="px-2 py-1" to="/">
        <span>Create Article</span>
      </Link>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
      <Link className="px-2 py-1" to="/">
        <span>My Profile</span>
      </Link>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
      <Link className="px-2 py-1" to="/">
        <span>Admin Management</span>
      </Link>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black  hover:text-gray-800 hover:bg-gray-100">
      <Link className="px-2 py-1" to="/">
        <span>Logout</span>
      </Link>
    </li>
  </ul>
);

export default Menu;
