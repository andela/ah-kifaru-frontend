import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@components/common/Layout';
import logo from '../assets/images/logo.png';

const Homepage = props => {
  return (
    <Layout>
      <div className="m-20 text-center">
        <h1 className="text-green-800">
          Welcome to ErrorSwag, what on your mind?
        </h1>
        <img src={logo} alt="errorswag logo" />
        <Link to="articles/55">
          <button
            type="button"
            className="bg-green-300 text-white p-2 hover:bg-green-700 border hover:border-red-300"
          >
            Comments
          </button>
        </Link>
        <Link to="/login">
          <button
            type="button"
            className="bg-green-300 text-white p-2 hover:bg-green-700 border hover:border-red-300"
          >
            Login
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Homepage;
