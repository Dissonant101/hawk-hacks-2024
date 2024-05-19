import { Button, Container } from '@mui/material';
import { LoginButton, SigninButton } from '../components/auth/AuthComponents';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';
import { BACKEND_URL } from '../constant';
import FormCard from '../components/auth/FormCard';
import { put } from '@vercel/blob';
import Icons from '../components/auth/Icons';
import { Navigate } from 'react-router-dom';

export function Auth() {
  const auth = useContext(SessionContext) as any;
  const [phase, setPhase] = useState('form');
  const [formState, setFormState] = useState(null);
  const [imgUrl, setImgUrl] = useState(
    'https://cdn.facesofopensource.com/wp-content/uploads/2017/03/16181944/linustorvalds.faces22106.web_.jpg',
  );
  const [file, setFile] = useState<any>(null);

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
    await fetch(
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

    setImgUrl((formState as any).github_profile_src);
    setPhase('image');
  }

  function onChangePicture(e: any) {
    setFile(e.currentTarget.files && e.currentTarget.files[0]);
  }

  useEffect(() => {
    if (file) {
      setImgUrl(URL.createObjectURL(file as Blob));
    }
  }, [file]);

  async function onSubmitPicture() {
    if (file) {
      const blob = await put(file.name, file, {
        access: 'public',
        token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
      });

      await fetch(
        'https://us-east-2.aws.neurelo.com/rest/users/' + (formState as any).id,
        {
          method: 'PATCH',
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY as string,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            img_src: blob.url,
          }),
        },
      );

      setPhase('icon');
    } else {
      await fetch(
        'https://us-east-2.aws.neurelo.com/rest/users/' + (formState as any).id,
        {
          method: 'PATCH',
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY as string,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            img_src: (formState as any).github_profile_src,
          }),
        },
      );

      setPhase('icon');
    }
  }

  async function onIconSubmit(lan: any, int: any) {
    await fetch(
      'https://us-east-2.aws.neurelo.com/rest/users/' + (formState as any).id,
      {
        method: 'PATCH',
        headers: {
          'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languages: JSON.stringify(lan),
          hackathons: JSON.stringify(int),
        }),
      },
    );

    setPhase('out');
  }

  const PhaseFunction = () => {
    if (auth.isLoggedIn) {
      if (phase === 'form') {
        return <FormCard props={formState} formSubmit={formSubmit} />;
      } else if (phase === 'image') {
        return (
          <div className="flex flex-col items-center gap-3 mt-12">
            <img src={imgUrl} className="h-[300px]"></img>
            <input
              className="mt-4"
              type="file"
              onChange={(e) => onChangePicture(e)}
            />
            <Button variant="contained" size="small" onClick={onSubmitPicture}>
              Submit Picture
            </Button>
          </div>
        );
      } else if (phase === 'icon') {
        return (
          <div>
            <Icons
              lan={(formState as any).languages}
              onIconSubmit={onIconSubmit}
            />
          </div>
        );
      } else {
        return (
          <div>
            <Navigate to="/" replace={true} />
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
    <div className="h-screen gradient-animation">
      <Container maxWidth="sm">
        <div className="flex flex-col items-center justify-center">
          <div className="flex pt-16">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/TinderIcon-2017.svg/1200px-TinderIcon-2017.svg.png"
              className="h-16 pr-4"
            ></img>
            <p className="font-sans text-6xl font-extrabold text-white font-main">
              !Tinder
            </p>
          </div>
        </div>
        <PhaseFunction />
      </Container>
    </div>
  );
}
