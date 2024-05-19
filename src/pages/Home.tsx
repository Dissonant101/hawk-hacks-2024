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

export const Home = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch users
    console.log('Hello');
    setUsers([
      {
        id: 1,
        name: 'Joe',
        src: tinderLogo,
        meta: { apk: 'some-apk-c.apk' },
        content: <div className="h-full bg-slate-500">Hi Joe</div>,
      },
      {
        id: 2,
        name: 'Bob',
        src: tinderLogo,
        meta: { apk: 'some-apk-c.apk' },
        content: <div className="h-full bg-slate-500">Hi Bob</div>,
      },
    ]);
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
