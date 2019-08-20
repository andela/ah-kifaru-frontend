import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/homePage';
import NotFoundPage from '@pages/notFoundPage';
import SignUpPage from '@pages/Signup/index';
import PasswordResetPage from '@pages/ResetPassword';
import RequestPasswordResetPage from '@pages/ForgotPassword';
import SingleArticlePage from '@pages/SingleArticle';
import { connect } from 'react-redux'
import { getFollowers } from '@modules/auth/actions'

const App = ({ isAuthenticated, id }) => {
  React.useEffect(() => {
    if(isAuthenticated) {
      // fire action to get loggged in user's initial data (bookmarks, notifications, followers, followee)
      getFollowers(id);
    }
  }, [isAuthenticated])
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={SignUpPage} />
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
        <Route exact path="/articles/:articleId" component={SingleArticlePage} />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Router>
)};

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authReducer.isAuthenticated,
    id: state.authReducer.user.id
  }
)

const mapDispatchToProps = {
  getFollowers,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
