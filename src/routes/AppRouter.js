import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/loginPage';
import Homepage from '../pages/hompage';
import SignupPage from '../pages/Signup';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Homepage} />
    <Route path="/login" exact component={LandingPage} />
    <Route path="/signup" exact component={SignupPage} />
  </Switch>
);

export default Routes;
