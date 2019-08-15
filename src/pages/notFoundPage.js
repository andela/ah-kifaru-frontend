import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/notfound.png';

const NotFoundPage = () => (
  <div className="flex items-center justify-center flex-col h-screen">
    <img src={logo} alt="404 Page" className="sm:w-2/4 md:w-1/5" />
    <h2 className="text-secondary my-6 md:w-2/5 text-center text-sm font-semibold">
      THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME CHANGED
      OR ITS TEMPORARILY UNAVAILABLE
    </h2>
    <Link
      to="/"
      className="btn text-white bg-primary py-3 px-10 font-medium rounded"
      title="Signup"
    >
      GO HOME
    </Link>
  </div>
);

export default NotFoundPage;
