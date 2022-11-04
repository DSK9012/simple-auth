import { useFormik } from 'formik';
import { object } from 'yup';
import { useStore } from 'store/Store';
import { signUpUserValidations } from './validations';

export interface SignUpFormik {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  reactExperience: number | undefined;
}

export default function useSignUpFormik() {
  const {
    userContext: { registerUser },
  } = useStore();

  return useFormik<SignUpFormik>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      reactExperience: undefined,
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: object(signUpUserValidations),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      registerUser(values, resetForm);
    },
  });
}
