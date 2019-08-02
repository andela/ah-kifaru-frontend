import React, { Component } from 'react';
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import logo from '../../assets/images/logo.png';
import { authAction } from '../../store/modules/auth/actions';
import SocialMediaLogin from '../SocialMedia/SocialMediaLogin';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isLoading = false;
    this.state = {
      submittting: false,
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    const { error } = this.props;
    if (error) {
      this.setState({ submittting: true });
      return;
    }
    this.setState({ submittting: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    const { authAction: loginAction } = this.props;
    const errors = {};
    if (!email) errors.email = 'Email cannot be empty';
    if (!password) errors.password = 'Password cannot be empty';
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...errors
        }
      }));
      return;
    }
    const {
      location: { url },
      history
    } = this.props;

    this.setState({ submittting: true });

    loginAction({ userData: { email, password }, history, url });
  }

  handleInputFieldChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  render() {
    const {
      isAuthenticated,
      location: { url }
    } = this.props;
    const {
      errors: { email: emailError, password: passwordError }
    } = this.state;
    if (isAuthenticated) return <Redirect to={url || '/'} />;
    const { status } = this.props;

    this.isLoading = status === 'authenticationPending';

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <div className="md:w-1/2 w-full rounded-r bg-white h-full">
        <form className="flex-4 px-5" onSubmit={this.handleSubmit}>
          <div>
            <img
              className="login-form-logo pt-10 pb-3 mx-auto"
              src={logo}
              alt="errorswag logo"
            />
          </div>

          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="email"
          >
            Email
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={this.handleInputFieldChange}
            />
          </label>
          {!!emailError && (
            <span className="text-red-600 text-xs">{emailError}</span>
          )}
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="password"
          >
            Password
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handleInputFieldChange}
            />
          </label>
          {!!passwordError && (
            <span className="text-red-600 text-xs">{passwordError}</span>
          )}
          <input
            className="login-btn hover:bg-teal-400 cursor-pointer text-white appearance-none block w-full border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-red focus:text-green"
            type="submit"
            value="Login"
            disabled={this.state.submittting}
          />
        </form>
        <div className="flex flex-col text-sm text-center justify-between items-center w-full pt-3 pb-5">
          <Link to="/forgot-password">
            <p className="text-color mb-2">Forgot Password</p>
          </Link>
          <Link to="/signup">
            <p>
              Don&apos;t have Account?
              <span className="text-color"> Sign up</span>
            </p>
          </Link>
        </div>
        <SocialMediaLogin location={location} />
        <br />
        <div className="sweet-loading">
          <BounceLoader
            css={override}
            sizeUnit="px"
            size={50}
            color="#f00"
            loading={this.isLoading}
          />
        </div>
      </div>
    );
  }
}
LoginForm.propTypes = {
  location: PropTypes.shape({
    from: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  authAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.authReducer.error,
  isAuthenticated: state.authReducer.isAuthenticated,
  status: state.authReducer.status
});
const mapDispatchToProps = {
  authAction
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
