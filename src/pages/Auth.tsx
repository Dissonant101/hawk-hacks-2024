import { Container } from '@mui/material';
import { LoginButton, SigninButton } from '../components/auth/AuthComponents';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';
import { BACKEND_URL } from '../constant';
// import githubUsername from 'github-username';

export function Auth() {
  const auth = useContext(SessionContext) as any;
  const [phase, setPhase] = useState('skills');

  useEffect(() => {
    // fetch(BACKEND_URL + '/github', {});
  }, []);

  function phaseFunction() {
    if (auth.isLoggedIn) {
      if (phase === 'skills') {
        return <div>Skills</div>;
      }
    } else {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-96">
            <p className="text-md font-sans font-main text-white text-center pt-[300px]">
              By tapping Create Account or Sign In, you agree to our Terms.
              Learn how we process your data in our <u>Privacy Policy</u> and{' '}
              <u>Cookies Policy</u>.
            </p>
          </div>
          <div className="flex gap-6 pt-8">
            <LoginButton />
            <SigninButton />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="gradient-animation h-screen">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className="flex pt-16">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/TinderIcon-2017.svg/1200px-TinderIcon-2017.svg.png"
              className="h-16 pr-4"
            ></img>
            <p className="text-6xl font-sans font-main text-white font-extrabold">
              !Tinder
            </p>
          </div>
        </div>
        {phaseFunction()}
      </Container>
    </div>
  );
}
