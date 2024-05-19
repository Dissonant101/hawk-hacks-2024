import { Layout } from './Layout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import AuthRedirect from '../components/auth/AuthRedirect';
const interests = [
  'JavaScript',
  'CSS',
  'HTML',
  'C++',
  'C#',
  'Unity',
  'Python',
  'Java',
  'React',
  'Node.js',
  'Express.js',
  'AWS',
];
const hackathons = [
  'HawkHacks',
  'JAMHacks',
  'Hack the North',
  'OttawaHacks',
  'StormHacks',
  'ElleHacks',
  'Cal Hacks',
];

export const Profile = () => {
  const [selectedInterests, setSelectedInterests] = useState(
    interests.map(() => false),
  );
  const [selectedHackathons, setSelectedHackathons] = useState(
    hackathons.map(() => false),
  );

  return (
    <AuthRedirect>
      <Layout>
        <Stack direction="row" spacing={3}>
          <div>
            Programming Interests
            {interests.map((interest, i) => (
              <Chip
                label={interest}
                onClick={() => {
                  const newSelectedInterests = [...selectedInterests];
                  // modify new
                  newSelectedInterests[i] = !newSelectedInterests[i];
                  setSelectedInterests(newSelectedInterests);
                }}
              />
            ))}
          </div>
        </Stack>
        <Stack direction="row" spacing={3}>
          <div>
            Hackathons Attended
            {hackathons.map((hackathon, i) => (
              <Chip
                label={hackathon}
                onClick={() => {
                  const newSelectedHackathons = [...selectedHackathons];
                  // modify new
                  newSelectedHackathons[i] = !newSelectedHackathons[i];
                  setSelectedHackathons(newSelectedHackathons);
                }}
              />
            ))}
          </div>
        </Stack>
      </Layout>
    </AuthRedirect>
  );
};
