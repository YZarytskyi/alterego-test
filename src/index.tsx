import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter basename="/alterego-test">
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
