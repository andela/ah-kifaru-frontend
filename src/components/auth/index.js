import React from 'react';
import { Link } from 'react-router-dom';

const cards = () => {
  return (
    <div className="flex justify-center w-full md:hidden ">
      <div className="max-w-sm flex items-center h-screen overflow-hidden w-full">
        <div className="flex justify-center items-center h-screen flex-col w-full">
          <div className="flex flex-col items-center">
            <Link
              to="/login"
              className="bg-teal-500  text-white text-center text-xs w-32  uppercase  py-3 px-5 "
            >
              LOGIN
            </Link>

            <Link
              to="/signup"
              className="bg-white-500 mt-6  text-center border border-red-500  w-32 text-xs py-3 px-1 uppercase text-red-600"
            >
              get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default cards;
