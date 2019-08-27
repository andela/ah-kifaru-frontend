import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/homePage';
import NotFoundPage from '@pages/notFoundPage';
import SignUpPage from '@pages/Signup/index';
import PasswordResetPage from '@pages/ResetPassword';
import RequestPasswordResetPage from '@pages/ForgotPassword';
import Editor from '@pages/Article/NewArticle';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route
        path="/reset-password/:token"
        exact
        component={PasswordResetPage}
      />
      <Route
        path="/forgot-password"
        exact
        component={RequestPasswordResetPage}
      />
      <PrivateRoute path="/newArticle" exact component={Editor} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
