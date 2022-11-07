import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';
import { Button, styled } from '@mui/material';
import LoginPage from 'components/LoginPage';
import PrivatePage from 'components/PrivatePage';
import { useStore } from 'store/Store';
import setAuthToken from 'helpers/set-auth-token';

const $Container = styled('div')(({ theme }) => ({
  height: '100vh',
  color: 'white',
  position: 'relative',
  maxWidth: '1200px',
  margin: '16px auto',
}));

const $Content = styled('div')(({ theme }) => ({
  marginTop: '32px',
  width: '100%',
  color: 'white',
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
    userContext: { isLoading, isAuthenticated, getUser, logout },
  } = useStore();

  useEffect(() => {
    if (!isAuthenticated) getUser();
  }, [isAuthenticated]);

  return (
    <$Container>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <$Header>Simple Auth</$Header>
        <div>
          {isAuthenticated && (
            <Button onClick={logout} variant='contained' startIcon={<LogoutIcon />}>
              Logout
            </Button>
          )}
        </div>
      </div>
      <$Content>{!isLoading && (isAuthenticated ? <PrivatePage /> : <LoginPage />)}</$Content>
    </$Container>
  );
}

export default App;
