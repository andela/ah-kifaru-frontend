import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/homePage';
import NotFoundPage from '@pages/notFoundPage';
import SocialMediaLogin from '@components/SocialMedia/SocialMediaLogin';
import SignUpPage from '@pages/Signup/index';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
