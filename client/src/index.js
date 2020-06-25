import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import UserContextProvider from './contexts/user.context';
import ThemeContextProvider from './contexts/theme.context';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
