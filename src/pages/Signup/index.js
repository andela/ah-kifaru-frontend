import './index.css';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { signupAction } from '../../actions/Signup';
import logo from '../../assets/images/logo.png';
import signupCard from '../../assets/images/signup.png';

import SignupSchema from './schema';

export const SignupForm = ({ isLoading, error, status, signUp }) => (
  <div className="w-11/12 md:w-9/12 lg:w-7/12 mx-auto m-16 rounded-lg flex items-stretch bg-red-400 h-100">
    <div className="md:flex max-w-lg w-7/12 bg-color height items-center signup-card hidden rounded-l-lg ">
      <div className=" pl-8 font-bold text-left text-white text-2xl">
        <div>Welcome back,</div>
        <div>Signup to share,</div>
        <div>recommend and bookmark</div>
      </div>
    </div>

    <div className="w-full lg:w-7/12 p-10 bg-white rounded-r-lg">
      <div className="w-full flex flex-col items-center mx-auto">
        <img src={logo} alt="errorswag logo" className="h-12 mb-6" />
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await signUp(values);
            if (status !== 'authenticationLoading') {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <div className="flex mx-auto flex-col w-full text-center">
              <Form className="">
                <div className="mb-6 w-100 text-left">
                  <label htmlFor="email">
                    {' '}
                    Email:
                    <Field
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      className={`${'w-11/12 h-12 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-400 text-xs">{errors.email}</div>
                    ) : null}
                  </label>
                </div>

                <div className="mb-6 w-100 text-left">
                  <label htmlFor="username">
                    {' '}
                    Username:
                    <Field
                      name="username"
                      placeholder="Username"
                      type="text"
                      className={`${'w-11/12 h-12 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-400 text-xs">
                        {errors.username}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="mb-8 w-100 text-left">
                  <label htmlFor="password">
                    Password:
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      className={`${'w-11/12 h-12 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-400 text-xs">
                        {errors.password}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="mb-6 w-100 text-left">
                  <button
                    type="submit"
                    name="submitForm"
                    className={`${'w-11/12 h-12 p-2 font-bold border text-gray-100 text-sm rounded'} ${
                      isSubmitting ? 'bg-teal-200' : 'bg-teal-500'
                    }`}
                  >
                    {isSubmitting ? 'SIGNING UP' : 'SIGN UP'}
                  </button>

                  <div className="w-100 text-center mb-4">
                    <button
                      type="submit"
                      className="mb-4 w-auto p-2 self-center button hover:text-indigo-700 text-center"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  status: state.signupReducer.status,
  isLoading: state.signupReducer.isLoading,
  isCompleted: state.signupReducer.isCompleted,
  error: state.signupReducer.error
});

const mapDispatchToProps = dispatch => ({
  signUp: userData => dispatch(signupAction(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
