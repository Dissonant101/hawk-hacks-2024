import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import { AuthProvider } from '@propelauth/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authUrl={import.meta.env.VITE_AUTH_URL!}>
    <App />
  </AuthProvider>,
);
