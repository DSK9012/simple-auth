import { useState } from 'react';
import { styled } from '@mui/material';
import { FormTypes } from 'helpers/types';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const $Container = styled('div')(({ theme }) => ({
  minHeight: '500px',
  width: '400px',
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  padding: '16px',
  display: 'flex',
  margin: '0 auto',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export default function LoginForm() {
  const [selectedForm, setSelectedForm] = useState<FormTypes>('sign-in-form');

  const handleFormChange = (formType: FormTypes) => {
    setSelectedForm(formType);
  };

  return (
    <$Container>
      {selectedForm === 'sign-in-form' ? (
        <SignInForm handleFormChange={handleFormChange} />
      ) : (
        <SignUpForm handleFormChange={handleFormChange} />
      )}
    </$Container>
  );
}
