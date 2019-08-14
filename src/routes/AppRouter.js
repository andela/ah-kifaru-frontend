import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from '@pages/loginPage';
import HomePage from '@pages/homePage';
import NotFoundPage from '@pages/notFoundPage';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LandingPage} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
