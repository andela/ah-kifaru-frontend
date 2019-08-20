import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import SignUpPage from '@pages/Signup/index';
import PasswordResetPage from '@pages/ResetPassword';
import RequestPasswordResetPage from '@pages/ForgotPassword';
import ArticlesPage from '@pages/LandingPage/index';
import Editor from '@pages/Article/NewArticle';
import SingleArticlePage from '@pages/SingleArticle';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" exact component={ArticlesPage} />
      <Route exact path="/article/:articleId" component={SingleArticlePage} />
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
      <PrivateRoute path="/new-article" exact component={Editor} />
      <Route exact path="/" component={ArticlesPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
