import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import SignUpPage from '@pages/Signup/index';
import PasswordResetPage from '@pages/ResetPassword';
import RequestPasswordResetPage from '@pages/ForgotPassword';
import ArticlesPage from '@pages/LandingPage/index';
import CommentsCard from '../components/Comments';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" component={ArticlesPage} />
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
      <Route path="/articles/:articleId" exact component={CommentsCard} />
      <Route component={NotFoundPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
