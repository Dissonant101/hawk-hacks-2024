import { WithAuthInfoProps, withAuthInfo } from '@propelauth/react';
import { Navigate } from 'react-router-dom';

const AuthRedirect = withAuthInfo((props: WithAuthInfoProps) => {
  return (
    <div>
      {!props.isLoggedIn && <Navigate to="/auth" replace={true} />}
      {(props as any).children}
    </div>
  );
});

export default AuthRedirect;
