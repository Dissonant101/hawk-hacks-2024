import { Button } from '@mui/material';
import { useRedirectFunctions, useLogoutFunction } from '@propelauth/react';

export function LoginButton() {
  const { redirectToLoginPage } = useRedirectFunctions();

  return (
    <Button
      onClick={() => redirectToLoginPage()}
      variant="contained"
      size="large"
      sx={{ width: '100px' }}
    >
      Login
    </Button>
  );
}

export function SigninButton() {
  const { redirectToSignupPage } = useRedirectFunctions();

  return (
    <Button
      onClick={() => redirectToSignupPage()}
      variant="contained"
      size="large"
      sx={{ width: '100px' }}
    >
      Register
    </Button>
  );
}

import LogoutIcon from '@mui/icons-material/Logout';

const iconStyle = {
  fontSize: 48,
  '&:focus': {
    fontSize: 56,
  },
};

export function SignOutButton() {
  const logoutFunction = useLogoutFunction();

  return (
    <LogoutIcon
      className="hover:opacity-50 transition cursor-pointer"
      style={iconStyle}
      onClick={() => logoutFunction(true)}
    />
  );
}
