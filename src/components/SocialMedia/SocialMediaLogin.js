import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { socialLogin } from '../../store/modules/auth/actions';
import { decodeToken, saveToLocalStorage } from '../../utils';
import SocialMedia from './SocialMediaButtons';

class SocialMediaLogin extends Component {
  componentDidMount() {
    const {
      socialLogin: loginSocial,
      location: { search }
    } = this.props;
    if (search) {
      const token = search.split('=').pop();
      saveToLocalStorage(token, null);
      const userData = decodeToken(this.props);
      loginSocial(userData);
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      const path = localStorage.getItem('url');
      localStorage.removeItem('url');
      if (path === null) {
        return <Redirect to="/" />;
      }
      return <Redirect to={path} />;
    }
    return <SocialMedia />;
  }
}

SocialMediaLogin.propTypes = {
  socialLogin: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

const mapDispatchToProps = {
  socialLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialMediaLogin);
