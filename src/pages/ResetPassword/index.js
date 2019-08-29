import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPasword } from '@modules/resetpassword/actions';
import { Redirect } from 'react-router-dom';
import SuccessContainer from '@components/common/Success';
import Layout from '@components/common/Layout';
import SyncLoader from 'react-spinners/SyncLoader';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .min(8, 'password should be a minimun of 8 characters')
    .matches(
      /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
      'Password must contain atleast one special character and uppercase letter'
    )
    .required('Password is required'),
  confirmpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null, ''], 'Passwords must match')
    .required('Passwords must match')
});

export const ResetPasswordForm = ({
  isLoading,
  showSuccess,
  errorMessage,
  successMessage,
  onSubmit,
  match,
  history
}) => {
  if (showSuccess) {
    setTimeout(() => {
      history.push('/login');
    }, 3000);
  }

  const handleSubmit = (password, token) => {
    onSubmit(password, token);
  };
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
                password: '',
                confirmpassword: ''
              }}
              validationSchema={passwordSchema}
              onSubmit={(values, actions) => {
                const { params } = match;
                handleSubmit(values.password, params.token);
                actions.setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form data-testid="submit-form">
                  <p className="my-6 text-center font-medium">
                    Please enter a new password to continue
                  </p>
                  <label className="label">
                    Password
                    <Field
                      className="auth-input"
                      type="password"
                      name="password"
                      placeholder="********"
                      data-testid="password"
                    />
                  </label>
                  {errors.password && touched.password && (
                    <p
                      className="text-danger text-sm mt-4"
                      data-testid="password-error"
                    >
                      *{errors.password}
                    </p>
                  )}
                  <label className="label">
                    Confirm Password
                    <Field
                      className="auth-input"
                      type="password"
                      name="confirmpassword"
                      placeholder="********"
                      data-testid="confirmpassword"
                    />
                  </label>
                  {errors.confirmpassword && touched.confirmpassword && (
                    <p
                      className="text-danger text-sm mt-4"
                      data-testid="confirmpassword-error"
                    >
                      *{errors.confirmpassword}
                    </p>
                  )}
                  {errorMessage && !errors.confirmpassword && (
                    <p
                      className="text-danger text-sm mt-4"
                      data-testid="server-error"
                    >
                      *{errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="primary-button w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SUBMITTING' : 'RESET PASSWORD'}
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

ResetPasswordForm.defaultProps = {
  errorMessage: null,
  isLoading: false,
  showSuccess: false,
  successMessage: null
};

ResetPasswordForm.propTypes = {
  isLoading: PropTypes.bool,
  showSuccess: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  isLoading: state.resetPassword.isPending,
  showSuccess: state.resetPassword.isSuccess,
  errorMessage: state.resetPassword.error,
  successMessage: state.resetPassword.message
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, token) => dispatch(resetPasword(email, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
