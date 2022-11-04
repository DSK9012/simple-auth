import { useEffect } from 'react';
import { styled } from '@mui/material';
import LoginPage from 'components/LoginPage';
import PrivatePage from 'components/PrivatePage';
import { useStore } from 'store/Store';
import setAuthToken from 'helpers/set-auth-token';

const $Container = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'white',
  position: 'relative',
}));

const $Content = styled('div')(({ theme }) => ({
  height: '90%',
  width: '85%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '99',
}));

const $Header = styled('h3')(() => ({
  fontSize: '40px',
  padding: '0 4px',
  fontFamily: 'Oleo Script Swash Caps, cursive',
  color: '#fff',
  cursor: 'pointer',
  background: 'linear-gradient(to bottom right, #03f9abbf, #32b8a2fa, #ffaa00, #ed5b09)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
}));

if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

function App() {
  const {
    userContext: { isLoading, isAuthenticated, getUser },
  } = useStore();

  useEffect(() => {
    if (!isAuthenticated) getUser();
  }, [isAuthenticated]);

  return (
    <$Container>
      <$Header>Simple Auth</$Header>
      <$Content>{!isLoading && (isAuthenticated ? <PrivatePage /> : <LoginPage />)}</$Content>
    </$Container>
  );
}

export default App;
