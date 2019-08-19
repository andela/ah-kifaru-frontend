import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@components/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <Link to="/login">Login</Link>
    </Layout>
  );
};

export default LoginPage;
