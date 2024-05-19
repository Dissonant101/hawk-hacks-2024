import { Layout } from './Layout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import AuthRedirect from '../components/auth/AuthRedirect';
import { Divider } from '@mui/material';
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
        <div className="flex flex-col gap-4 p-4">
          <div className="bg-pink-600 p-4 rounded-xl">
            <p className="bg-center flex justify-center">Create your profile</p>
          </div>
          <div className="bg-black p-8 rounded-xl">
            <p className="text-white pt-0 pb-4">Programming Interests</p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((_, i) => (
                <button
                  className={
                    'px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 ' +
                    (selectedInterests[i]
                      ? 'bg-pink-600 text-white'
                      : 'text-white')
                  }
                  key={i}
                  onClick={() => {
                    const newSelectedInterests = [...selectedInterests];
                    newSelectedInterests[i] = !newSelectedInterests[i];
                    setSelectedInterests(newSelectedInterests);
                  }}
                >
                  {interests[i]}
                </button>
              ))}
            </div>
            <Divider />
            <p className="text-white py-4">Hackathons Attended</p>
            <div className="flex flex-wrap gap-2">
              {hackathons.map((_, i) => (
                <button
                  className={
                    'px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 ' +
                    (selectedHackathons[i]
                      ? 'bg-pink-600 text-white'
                      : 'text-white')
                  }
                  key={i}
                  onClick={() => {
                    const newSelectedHackathons = [...selectedHackathons];
                    newSelectedHackathons[i] = !newSelectedHackathons[i];
                    setSelectedHackathons(newSelectedHackathons);
                  }}
                >
                  {hackathons[i]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </AuthRedirect>
  );
};
