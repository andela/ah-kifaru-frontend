import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import SignUpPage from '@pages/Signup/index';
import PasswordResetPage from '@pages/ResetPassword';
import RequestPasswordResetPage from '@pages/ForgotPassword';
import SearchPage from '@pages/SearchPage';

import ArticlesPage from '@pages/LandingPage/index';
import Editor from '@pages/Article/NewArticle';
import CommentsCard from '../components/Comments';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route
        path="/reset-password/:token"
        exact
        component={PasswordResetPage}
      />
      <Route exact path="/" component={ArticlesPage} />
      <Route
        path="/forgot-password"
        exact
        component={RequestPasswordResetPage}
      />
      <PrivateRoute path="/new-article" exact component={Editor} />
      <Route path="/articles/:articleId" exact component={CommentsCard} />

      <Route exact path="/search" component={SearchPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
