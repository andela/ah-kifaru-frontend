import React from 'react';
import Facebook from './icons/facebook_btn.svg';
import Google from './icons/google_btn.svg';
import Github from './icons/github.svg';
import './social.css';

const GITHUB_LOGIN = `https://errorswag-staging.herokuapp.com/api/v1/auth/github`;
const FACEBOOK_LOGIN = `https://errorswag-staging.herokuapp.com/api/v1/auth/facebook`;
const GOOGLE_LOGIN = `https://errorswag-staging.herokuapp.com/api/v1/auth/google`;
const SocialMedia = () => (
  <div className="flex flex-col justify-center items-center">
    <a href={GITHUB_LOGIN} className="mb-2">
      <Github />
    </a>
    <a href={FACEBOOK_LOGIN} className="mb-2">
      <Facebook />
    </a>
    <a href={GOOGLE_LOGIN} className="mb-2">
      <Google />
    </a>
  </div>
);

export default SocialMedia;
