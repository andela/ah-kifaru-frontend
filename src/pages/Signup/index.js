import './index.css';
import React from 'react';
import { connect } from 'react-redux';

import { SignupFormComponent } from '@components/SignupForm';
import { authAction } from '../../store/modules/auth/actions';
import logo from '../../assets/images/logo.png';
import SocialMediaLogin from '../../components/SocialMedia/SocialMediaLogin';

export const SignupForm = ({ status, signUp, history, location }) => (
  <div className="w-11/12 md:w-9/12 lg:w-7/12 mx-auto m-16 rounded-lg flex items-stretch bg-red-400 h-100">
    <div className="md:flex max-w-lg w-7/12 bg-color height items-center signup-card hidden rounded-l-lg ">
      <div className=" pl-8 font-bold text-left text-white text-3xl">
        <h2>Welcome to ErrorSwag,</h2>
        <h1>Signup to share,</h1>
        <h2>recommend and bookmark</h2>
      </div>
    </div>
    <div className="w-full lg:w-7/12 p-8 bg-white rounded-r-lg">
      <div className="w-full flex flex-col items-center mx-auto">
        <img src={logo} alt="errorswag logo" className="h-12 mb-4" />
        <SignupFormComponent
          signUp={signUp}
          history={history}
          status={status}
          location={location}
        />
      </div>
      <SocialMediaLogin location={location} />
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    status: state.status
  };
};

const mapDispatchToProps = dispatch => ({
  signUp: ({ userData, history, url }) =>
    dispatch(authAction({ userData, history, url }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
