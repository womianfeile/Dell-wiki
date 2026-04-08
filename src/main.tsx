import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { applyThemeCursor } from './hooks/useTheme';
import './styles/globals.css';

const redirectPath = sessionStorage.getItem('dell-wiki-redirect-path');
if (redirectPath) {
  sessionStorage.removeItem('dell-wiki-redirect-path');
  window.history.replaceState({}, '', redirectPath);
}

const storedTheme = window.localStorage.getItem('dell-wiki-theme');
applyThemeCursor(storedTheme === 'dark' ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
