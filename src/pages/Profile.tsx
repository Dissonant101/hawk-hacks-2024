import { Layout } from './Layout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import AuthRedirect from '../components/auth/AuthRedirect';
const interests = ['JavaScript', 'CSS', 'HTML'];

export const Profile = () => {
  const [selectedInterests, setSelectedInterests] = useState([
    false,
    false,
    false,
  ]);

  return (
    <AuthRedirect>
      <Layout>
        <Stack direction="row" spacing={1}>
          <div>
            {interests.map((interest, i) => (
              <Chip
                label="Chip Filled"
                onClick={() => {
                  console.log(interest);
                }}
              />
            ))}
          </div>
          <div>HELLO!</div>
        </Stack>
      </Layout>
    </AuthRedirect>
  );
};
