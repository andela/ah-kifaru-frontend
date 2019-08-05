import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/loginPage';
import Homepage from '../pages/hompage';
import User from '../components/user.register/index';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Homepage} />
    <Route path="/login" exact component={LandingPage} />
    <Route path="/user" exact component={User} />
  </Switch>
);

export default Routes;
