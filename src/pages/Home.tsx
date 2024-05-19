import {
  Avatar,
  Box,
  Chip,
  Container,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { Layout } from './Layout';

import tinderLogo from '/!tinder.svg';
import EmptyState from '/!tinder.svg';
import { useEffect, useState } from 'react';
import {
  CardEnterEvent,
  CardEvent,
  CardSwiper,
} from '../components/react-card-swiper';
import AuthRedirect from '../components/auth/AuthRedirect';
import axios from 'axios';
import { ProfileModal } from '../components/ProfileModal';

export const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get('https://us-east-2.aws.neurelo.com' + '/rest/users', {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY':
            'neurelo_9wKFBp874Z5xFw6ZCfvhXYgW+6IrvRGB88Iaa4knlm2zOF/nakrV/jSrVszE2WKDcf6S6+ooTEHQrgYgjMWtj++yCOV/Lp7hhorR0HGRrU3zoYKG0E4LVMuqD21mEtT4d/rtJeIWQY4yEA8lYlLa6ZjekJjhcE6fbcPmEnOxjHI5QBKYyvA/JSSKTs6R+gPU_6IhO4QlrTFhy/Fn5eJ9LuEBO0SAsyevH05G8s7U1QPg=',
        },
      })
      .then((res) => {
        setUsers(
          res.data.data.map((user: any) => ({
            id: user.id,
            name: user.first_name + user.last_name,
            meta: { apk: 'some-apk-c.apk' },
            src: user.img_src,
            content: (
              <div
                className="bg-slate-600 pt-4 pb-2 flex flex-col gap-2 justify-center items-center hover:bg-pink-400 transition"
                onClick={() => {
                  console.log(user.id);
                  setId(user.id);
                  setOpen(!open);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar alt={user.first_name} src={user.github_profile_src} />{' '}
                  <p className="font-main">
                    {user.first_name} {user.last_name} | {user.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {user.languages &&
                    JSON.parse(user.languages).map((language: any, i: any) => {
                      if (i <= 4) {
                        return (
                          <button className="px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 bg-pink-600 text-white">
                            <p className="font-main text-xs">{language}</p>
                          </button>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
                <div className="flex gap-2">
                  {user.hackathons &&
                    JSON.parse(user.hackathons).map((language: any, i: any) => {
                      if (i <= 4) {
                        return (
                          <button className="px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 text-white">
                            <p className="font-main text-xs">{language}</p>
                          </button>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
            ),
          })),
        );
        console.log(res.data.data);
      });
  }, []);

  const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
    // if (action === SwipeAction.LIKE)
    console.log({ el, meta, id, action, operation }); // event data to be handled
  };

  const handleFinish = (status: string) => {
    console.log(status); // 'finished'
  };

  const handleEnter: CardEnterEvent = (el, meta, id) => {
    console.log(el, meta, id);
  };

  return (
    <AuthRedirect>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Container
          maxWidth="sm"
          className="flex flex-col justify-center items-center"
        >
          <ProfileModal id={id} />
        </Container>
      </Modal>
      <Layout>
        {users.length && (
          <Stack
            height={'100%'}
            width={'100%'}
            direction="column"
            alignItems="center"
            justifyContent={'end'}
            p={2}
          >
            <CardSwiper
              data={users}
              onEnter={handleEnter}
              onFinish={handleFinish}
              onDismiss={handleDismiss}
              withRibbons
              likeRibbonText="LIKE"
              dislikeRibbonText="NOPE"
              ribbonColors={{
                bgLike: 'green',
                bgDislike: 'red',
                textColor: 'white',
              }}
              emptyState={
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  textAlign={'center'}
                  gap={2}
                >
                  <Box component={'img'} width={250} src={EmptyState} />
                  <Typography variant={'subtitle2'}>
                    You've reached the <br /> end of the list 😱
                  </Typography>
                </Stack>
              }
            />
          </Stack>
        )}
      </Layout>
    </AuthRedirect>
  );
};
