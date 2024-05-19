import { Button } from '@mui/material';
import { useRedirectFunctions } from '@propelauth/react';

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
