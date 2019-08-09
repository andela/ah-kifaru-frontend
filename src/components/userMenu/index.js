import React from 'react';
import './Menu.css';

const Menu = () => (
  <ul className="absolute right-0 top-0 mt-10 p-5  shadow-lg bg-white z-10 block text-left w-100 menu">
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black-600 hover:text-gray-800 hover:bg-gray-100">
      <a className="px-2 py-1" href="/">
        <span>Create Article</span>
      </a>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
      <a className="px-2 py-1" href="/">
        <span>My Profile</span>
      </a>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black hover:text-gray-800 hover:bg-gray-100">
      <a className="px-2 py-1" href="/">
        <span>Admin Management</span>
      </a>
    </li>
    <li className="p-3 whitespace-no-wrap text-sm md:text-base text-black  hover:text-gray-800 hover:bg-gray-100">
      <a className="px-2 py-1" href="/">
        <span>Logout</span>
      </a>
    </li>
  </ul>
);

export default Menu;
