import { WithAuthInfoProps, withAuthInfo } from '@propelauth/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Team } from './pages/Team.tsx';
import { Profile } from './pages/Profile.tsx';
import { Auth } from './pages/Auth.tsx';
import { createContext } from 'react';

export const SessionContext = createContext(null);

const App = withAuthInfo((props: WithAuthInfoProps) => {
  return (
    <div>
      <SessionContext.Provider value={props as any}>
        <BrowserRouter>
          {!props.isLoggedIn && <Navigate to="/auth" replace={true} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </SessionContext.Provider>
    </div>
  );
});

export default App;
