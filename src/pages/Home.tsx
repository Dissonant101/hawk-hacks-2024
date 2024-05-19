import { Box, Stack, Typography } from '@mui/material';
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

export const Home = () => {
  const [users, setUsers] = useState<any[]>([]);

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
            src: user.github_profile_src,
            meta: { apk: 'some-apk-c.apk' },
            content: (
              <div className="h-full p-2 bg-slate-500">
                {user.first_name} {user.last_name} | {user.location}
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
