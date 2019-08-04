import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/loginPage';
import Homepage from '../pages/hompage';
import NotificationsPage from '../pages/Notifications';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Homepage} />
    <Route path="/login" exact component={LandingPage} />
    <Route path="/notification" exact component={NotificationsPage} />
  </Switch>
);

export default Routes;
