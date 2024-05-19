import { Button, Container } from '@mui/material';
import { LoginButton, SigninButton } from '../components/auth/AuthComponents';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';
import { BACKEND_URL } from '../constant';
import FormCard from '../components/auth/FormCard';

export function Auth() {
  const auth = useContext(SessionContext) as any;
  const [phase, setPhase] = useState('');
  const [formState, setFormState] = useState(null);
  const [imgUrl, setImgUrl] = useState(
    'https://cdn.facesofopensource.com/wp-content/uploads/2017/03/16181944/linustorvalds.faces22106.web_.jpg',
  );

  useEffect(() => {
    if (auth.isLoggedIn) {
      if (phase === 'form') {
        async function backendFetch() {
          const result = await fetch(BACKEND_URL + '/github', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: auth.user.email,
              first: auth.user.firstName,
              last: auth.user.lastName,
            }),
          });
          const resultJSON = await result.json();
          setFormState(resultJSON);
        }
        backendFetch();
      }
    }
  }, [phase]);

  async function formSubmit(
    first: string,
    last: string,
    loc: string,
    bio: string,
  ) {
    const result = await fetch(
      'https://us-east-2.aws.neurelo.com/rest/users/' + (formState as any).id,
      {
        method: 'PATCH',
        headers: {
          'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          location: loc,
          bio: bio,
        }),
      },
    );

    setPhase('image');
  }

  const PhaseFunction = () => {
    if (auth.isLoggedIn) {
      if (phase === 'form') {
        return <FormCard props={formState} formSubmit={formSubmit} />;
      } else if (phase === 'image') {
        return (
          <div>
            {/* <img 
            <input id="file-upload" type="file" /> */}
          </div>
        );
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
  };

  return (
    <div className="gradient-animation h-screen">
      <Container maxWidth="sm">
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
        <PhaseFunction />
      </Container>
    </div>
  );
}
