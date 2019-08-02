import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              url: props.location
            }}
          />
        );
      }}
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    from: PropTypes.string
  }).isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
