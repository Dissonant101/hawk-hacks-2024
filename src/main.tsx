import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './pages/Auth.tsx';
import { Home } from './pages/Home.tsx';
import { Team } from './pages/Team.tsx';
import { Profile } from './pages/Profile.tsx';
import React from 'react';
import { AuthProvider } from '@propelauth/react';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/team',
    element: <Team />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authUrl={import.meta.env.VITE_AUTH_URL!}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
