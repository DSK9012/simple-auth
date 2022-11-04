import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';
import theme from 'helpers/theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from './store/Store';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Store>
        <App />
      </Store>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
