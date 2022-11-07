import { InputAdornment, Button, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import useFormikHelpers from 'formik-config/FormikHelpers';
import useSignInFormik, { SignInFormik } from 'formik-config/SignInUserFormik';
import CustomTextField from 'helpers/CustomTextField';
import { FormTypes } from 'helpers/types';

const $SignUpLink = styled('p')(({ theme }) => ({
  fontSize: '16px',
  margin: '8px 0 0 16px',
}));

interface ISignInFormProps {
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignInForm({ handleFormChange }: ISignInFormProps) {
  const formik = useSignInFormik();
  const { email, password } = formik.values;
  const { handleChangeAndBlur, hasError, getHelpText } = useFormikHelpers<SignInFormik>(formik);

  const handleSubmit = () => {
    if (formik.isValid && formik.dirty) formik.submitForm();
  };

  return (
    <>
      <CustomTextField
        placeholder='Email'
        fullWidth
        size='small'
        spellCheck='false'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        type='text'
        title=''
        name='email'
        value={email}
        onChange={handleChangeAndBlur('email')}
        error={hasError('email')}
        helperText={getHelpText('email')}
      />
      <CustomTextField
        spellCheck='false'
        placeholder='Password'
        fullWidth
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PasswordIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        type='password'
        title=''
        name='password'
        value={password}
        onChange={handleChangeAndBlur('password')}
        error={hasError('password')}
        helperText={getHelpText('password')}
      />
      <Button fullWidth variant='contained' onClick={handleSubmit}>
        Sign In
      </Button>
      <$SignUpLink>
        New User?{' '}
        <Button size='small' disableRipple sx={{ fontSize: '16px' }} onClick={() => handleFormChange('sign-up-form')}>
          Sign Up
        </Button>
      </$SignUpLink>
    </>
  );
}
