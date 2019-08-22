import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { Formik, Form, Field } from 'formik';
import { css } from '@emotion/core';

import SignupSchema from './schema';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const SignupFormComponent = ({ signUp, history, status, location }) => (
  <Formik
    initialValues={{
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }}
    validationSchema={SignupSchema}
    onSubmit={async (values, { setSubmitting }) => {
      setSubmitting(true);
      await signUp({ userData: values, history, url: location.url });
      if (status !== 'authenticationLoading') {
        setSubmitting(false);
      }
    }}
  >
    {({ errors, touched, isSubmitting }) => (
      <div className="flex mx-auto flex-col w-full text-center">
        <div className="sweet-loading flex">
          <SyncLoader
            css={override}
            sizeUnit="em"
            size={0.6}
            color="#f00"
            loading={isSubmitting}
          />
        </div>
        <Form className="">
          <div className="mb-4 w-100 text-left">
            <div>Email:</div>
            <Field
              name="email"
              placeholder="Email Address"
              type="email"
              className={`${'w-full h-12 pl-6 border border-gray-400 text-sm bg-gray-300 rounded'} ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && touched.email ? (
              <div className="text-danger text-xs" data-testid="emailError">
                {errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-4 w-100 text-left">
            <div>Username:</div>
            <Field
              name="username"
              placeholder="Username"
              type="text"
              className={`${'w-full h-10 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && touched.username ? (
              <div className="text-danger text-xs" data-testid="usernameError">
                {errors.username}
              </div>
            ) : null}
          </div>

          <div className="mb-4 w-100 text-left">
            <div>Password:</div>
            <Field
              name="password"
              placeholder="Password"
              type="password"
              className={`${'w-full h-10 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && touched.password ? (
              <div className="text-danger text-xs" data-testid="passwordError">
                {errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-8 w-100 text-left">
            <div>Confirm Password:</div>
            <Field
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              className={`${'w-full h-10 p-2 pl-6 border border-gray-400 text-sm bg-gray-300 text-red-black rounded'} ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div
                className="text-xs text-danger"
                data-testid="confirmPasswordError"
              >
                {errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="w-100 text-left">
            <button
              type="submit"
              name="submitForm"
              data-testid="submitForm"
              className={`${'w-full h-12 p-2 font-bold border text-white text-sm rounded'} ${
                isSubmitting ? 'bg-teal-200' : 'bg-teal-500'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SIGNING UP' : 'SIGN UP'}
            </button>

            <div className="w-100 text-center mb-2">
              <button
                type="submit"
                className="mt-2 w-auto p-2 self-center button hover:text-indigo-700 text-center text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </Form>
      </div>
    )}
  </Formik>
);

export default SignupFormComponent;
