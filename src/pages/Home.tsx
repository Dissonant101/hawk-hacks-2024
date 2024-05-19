import {
  Avatar,
  Box,
  Container,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { Layout } from './Layout';

import EmptyState from '/!tinder.svg';
import { useEffect, useState } from 'react';
import {
  CardEvent,
  CardSwiper,
  SwipeAction,
} from '../components/react-card-swiper';
import AuthRedirect from '../components/auth/AuthRedirect';
import axios from 'axios';
import { useUser } from '../hooks/useUser';
import { ProfileModal } from '../components/ProfileModal';
import { useTeam } from '../hooks/useTeam';

export const Home = () => {
  const { user, loading } = useUser();
  const { team, teamLoading } = useTeam({ user, loading });
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (loading || teamLoading) return;
    axios
      .get('https://us-east-2.aws.neurelo.com' + '/rest/users', {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
        },
      })
      .then((res) => {
        setUsers(
          res.data.data
            .filter((u: any) => !team.some((t) => t.id === u.id))
            .map((u: any) => ({
              id: u.id,
              name: u.first_name + ' ' + u.last_name,
              meta: u,
              src: u.img_src,
              content: (
                <div
                  className="flex flex-col items-center justify-center gap-2 pt-4 pb-2 transition bg-slate-600 hover:bg-pink-400"
                  onClick={() => {
                    console.log(u.id);
                    setId(u.id);
                    setOpen(!open);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar alt={u.first_name} src={u.github_profile_src} />{' '}
                    <p className="font-main">
                      {u.first_name} {u.last_name} | {u.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {u.languages &&
                      JSON.parse(u.languages).map(
                        (language: any, i: any) =>
                          i <= 4 && (
                            <button
                              key={i}
                              className="px-2 text-white bg-pink-600 border border-pink-300 rounded-full active:border-pink-500 active:bg-pink-800"
                            >
                              <p className="text-xs font-main">{language}</p>
                            </button>
                          ),
                      )}
                  </div>
                  <div className="flex gap-2">
                    {u.hackathons &&
                      JSON.parse(u.hackathons).map((language: any, i: any) => {
                        if (i <= 4) {
                          return (
                            <button className="px-2 text-white border border-pink-300 rounded-full active:border-pink-500 active:bg-pink-800">
                              <p className="text-xs font-main">{language}</p>
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
  }, [loading, teamLoading]);

  const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
    // Create new invite
    console.log({ user });

    if (action === SwipeAction.LIKE) {
      axios
        .post(
          'https://us-east-2.aws.neurelo.com/rest/invites/__one',
          {
            team_id: user.team_id,
            recipient_id: (meta as any).id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            },
          },
        )
        .then(console.log);

      console.log({ el, meta, id, action, operation }); // event data to be handled
    }
  };

  const handleFinish = (status: string) => {
    console.log(status); // 'finished'
  };

  return (
    <AuthRedirect>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Container
          maxWidth="sm"
          className="flex flex-col items-center justify-center"
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
                    You've reached the <br /> end of the list!
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
