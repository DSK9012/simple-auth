import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { InputAdornment, Button, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { FormTypes } from 'helpers/types';
import useSignUpFormik, { SignUpFormik } from 'formik-config/SignUpUserFormik';
import useFormikHelpers from 'formik-config/FormikHelpers';
import CustomTextField from 'helpers/CustomTextField';

const $SignUpLink = styled('p')(({ theme }) => ({
  fontSize: '16px',
  marginLeft: '16px',
}));

interface ISignupFormProps {
  handleFormChange: (formType: FormTypes) => void;
}

export default function SignUpForm({ handleFormChange }: ISignupFormProps) {
  const formik = useSignUpFormik();
  const { email, password, confirmPassword, name, reactExperience } = formik.values;
  const { handleChangeAndBlur, hasError, getHelpText } = useFormikHelpers<SignUpFormik>(formik);

  const handleSubmit = () => {
    if (formik.isValid && formik.dirty) formik.submitForm();
  };

  return (
    <>
      <CustomTextField
        placeholder='Display Name'
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
        name='name'
        value={name}
        onChange={handleChangeAndBlur('name')}
        error={hasError('name')}
        helperText={getHelpText('name')}
      />
      <CustomTextField
        placeholder='React Experience'
        fullWidth
        size='small'
        spellCheck='false'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <DonutLargeIcon htmlColor='#47e7e7' fontSize='small' />
            </InputAdornment>
          ),
        }}
        type='text'
        title=''
        name='reactExperience'
        value={reactExperience}
        onChange={handleChangeAndBlur('reactExperience')}
        error={hasError('reactExperience')}
        helperText={getHelpText('reactExperience')}
      />
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
      <CustomTextField
        spellCheck='false'
        placeholder='Confirm Password'
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
        name='confirmPassword'
        value={confirmPassword}
        onChange={handleChangeAndBlur('confirmPassword')}
        error={hasError('confirmPassword')}
        helperText={getHelpText('confirmPassword')}
      />
      <Button
        fullWidth
        variant='contained'
        disabled={!formik.dirty || !formik.isValid}
        sx={{
          margin: '8px 0',
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <$SignUpLink>
        Have Account?{' '}
        <Button size='small' disableRipple sx={{ fontSize: '16px' }} onClick={() => handleFormChange('sign-in-form')}>
          Sign In
        </Button>
      </$SignUpLink>
    </>
  );
}
