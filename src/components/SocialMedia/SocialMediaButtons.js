import React from 'react';
import Facebook from '../icons/facebook_btn.svg';
import Google from '../icons/google_btn.svg';
import Github from '../icons/login_github.svg';
import './social.css';

const GITHUB_LOGIN = `https://errorswag-staging.herokuapp.com/api/v1/auth/github`;
const FACEBOOK_LOGIN = `https://errorswag-staging.herokuapp.com/api/v1/auth/facebook`;
const GOOGLE_LOGIN = `http://localhost:3000/api/v1/auth/google`;
const SocialMedia = () => (
  <div className="social flex flex-col items-center justify-around w-3/5 m-auto">
    <a href={GITHUB_LOGIN} className="w-3/4">
      <Github />
    </a>
    <a href={FACEBOOK_LOGIN} className="w-3/4">
      <Facebook />
    </a>
    <a href={GOOGLE_LOGIN} className="w-3/4">
      <Google />
    </a>
  </div>
);

export default SocialMedia;
