import { Button } from '@mui/material';
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
  WithAuthInfoProps,
} from '@propelauth/react';

const YourApp = withAuthInfo((props: WithAuthInfoProps) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in as {props.user.email}</p>
        <Button onClick={() => redirectToAccountPage()} variant="contained">
          Account
        </Button>
        <Button onClick={() => logoutFunction(true)} variant="contained">
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <Button onClick={() => redirectToLoginPage()} variant="contained">
          Login
        </Button>
        <Button
          onClick={() => {
            redirectToSignupPage();
          }}
          variant="contained"
        >
          Signup
        </Button>
      </div>
    );
  }
});

export default YourApp;
