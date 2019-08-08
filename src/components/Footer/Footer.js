import React from 'react';
import './Footer.css';

import {
  YoutubeIcon,
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon
} from '../../assets/icons';

const Footer = () => {
  return (
    <footer className="footer flex flex-wrap w-full justify-center px-5">
      <div className="sm:w-1/2 h-8">
        <p className=" flex justify-start">Designed by Kifaru Team</p>
      </div>
      <div className="sm:w-1/2 h-8">
        <ul className="flex justify-end items-center">
          <li className="mx-1 px-2 py-1 cursor-pointer">
            <TwitterIcon />
          </li>
          <li className="mx-1 px-2 py-1 cursor-pointer">
            <FacebookIcon />
          </li>
          <li className="mx-1 px-2 py-1 cursor-pointer">
            <InstagramIcon />
          </li>
          <li className="mx-1 px-2 py-1 cursor-pointer">
            <YoutubeIcon />
          </li>
          <li className="mx-1 px-2 py-1 cursor-pointer">
            <LinkedInIcon />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;