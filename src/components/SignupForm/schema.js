import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Required'),
  username: Yup.string()
    .required('Required')
    .trim(),
  password: Yup.string()
    .trim()
    .min(8, 'minumum of 8 characters')
    .matches(
      /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
      'Password must contain atleast one special character and uppercase letter'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], "Passwords don't match!")
    .required('Required')
});

export default SignupSchema;
