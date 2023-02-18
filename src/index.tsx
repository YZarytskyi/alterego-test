import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </React.StrictMode>
);
