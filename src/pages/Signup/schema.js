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
    .min(6, 'minumum of 6 characters')
    .matches(
      /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
      'Password must contain atleast one special character and uppercase letter'
    )
    .required('Required')
});

export default SignupSchema;
