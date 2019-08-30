import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitRequest } from '@modules/resetpassword/actions';
import SuccessContainer from '@components/common/Success';
import Layout from '@components/common/Layout';
import SyncLoader from 'react-spinners/SyncLoader';
import { Formik, Form, Field } from 'formik';

export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export const RequestPasswordResetForm = ({
  isLoading,
  showSuccess,
  errorMessage,
  successMessage,
  onSubmit
}) => {
  return (
    <Layout>
      <main className="content flex items-center justify-center">
        {showSuccess ? (
          <SuccessContainer>{successMessage.toUpperCase()}</SuccessContainer>
        ) : (
          <div className="flex flex-col items-center max-w-sm sm:m-6">
            <SyncLoader
              sizeUnit="em"
              size={0.6}
              color="red"
              loading={isLoading}
            />
            <Formik
              initialValues={{
                email: ''
              }}
              onSubmit={(values, actions) => {
                onSubmit(values.email);
                actions.setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form data-testid="submit-form">
                  <p className="my-6 text-center font-medium">
                    Enter your email address and we will send you password reset
                    link
                  </p>
                  <label className="label">
                    Email Address
                    <Field
                      className="auth-input"
                      name="email"
                      validate={validateEmail}
                      id="email"
                      type="email"
                      placeholder="johndoe@errorswag.com"
                      data-testid="email"
                    />
                  </label>
                  {errorMessage && !errors.email && (
                    <p
                      data-testid="server-error"
                      className="text-danger text-sm mt-4"
                    >
                      *
                      {errorMessage}
                    </p>
                  )}
                  {errors.email && touched.email && (
                    <p
                      data-testid="email-error"
                      className="text-danger text-sm mt-4"
                    >
                      *
                      {errors.email}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="primary-button w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SUBMITTING' : 'REQUEST PASSWORD RESET'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </main>
    </Layout>
  );
};

RequestPasswordResetForm.defaultProps = {
  errorMessage: null,
  isLoading: false,
  showSuccess: false,
  successMessage: null
};

RequestPasswordResetForm.propTypes = {
  isLoading: PropTypes.bool,
  showSuccess: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.resetPassword.isPending,
  showSuccess: state.resetPassword.isSuccess,
  errorMessage: state.resetPassword.error,
  successMessage: state.resetPassword.message
});

const mapDispatchToProps = dispatch => ({
  onSubmit: email => dispatch(submitRequest(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestPasswordResetForm);
