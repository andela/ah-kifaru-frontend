import React from 'react';
import ConnectedLoginForm from '@components/Login/LoginForm';
import LoginCard from '../components/Login/LoginCard';

const LoginPage = props => (
  <LoginCard>
    <ConnectedLoginForm {...props} />
  </LoginCard>
);

export default LoginPage;
