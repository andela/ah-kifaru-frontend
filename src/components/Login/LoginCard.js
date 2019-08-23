import React from 'react';
import PropTypes from 'prop-types';

const LoginCard = ({ children }) => {
  return (
    <div className="flex justify-center h-screen align-middle">
      <div className="flex items-center sm:w-full md:w-10/12 lg:w-6/12 md:m-40">
        <div className="flex md:h-full sm:h-full">
          <div className="md:flex auth-bg sm:w-1/2 overflow-hidden w-full hidden rounded-l">
            <h1 className="flex px-5 items-center text-left text-white text-2xl font-bold">
              Welcome back, 
              {' '}
              <br />
              {' '}
Sign in to share, recommend and bookmark.
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  children: PropTypes.node.isRequired
};

export default LoginCard;
