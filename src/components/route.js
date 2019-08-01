import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/loginPage';
import Homepage from '../pages/hompage';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Homepage} />
    <Route path="/login" exact component={LandingPage} />
  </Switch>
);

export default Routes;
