import { Layout } from './Layout';
import { useState } from 'react';
import AuthRedirect from '../components/auth/AuthRedirect';
import { useUser } from '../hooks/useUser';
import { Avatar, Card } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';
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
  const { user, loading } = useUser();

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
          <Card>
            <div className="p-8">
              <div className="flex gap-2 items-center">
                <Avatar alt={user?.first_name} src={user?.github_profile_src} />{' '}
                <p className="font-main">
                  {user?.first_name} {user?.last_name} | {user?.location}
                </p>
              </div>
              <p className="font-main text-center text-sm">{user?.email}</p>
              <img src={user?.img_src} className="w-[100px] rounded-xl"></img>
              <p className="text-center text-sm text-slate-500 mt-2">
                {user?.bio}
              </p>
              <div className="flex gap-2 items-center my-4">
                <CodeIcon />
                <p className="font-main">Languages</p>
              </div>
              <div className="flex gap-2">
                {user?.languages &&
                  JSON.parse(user?.languages).map((language: any, i: any) => {
                    return (
                      <button className="px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 bg-pink-600 text-white">
                        <p className="font-main text-xs">{language}</p>
                      </button>
                    );
                  })}
              </div>
              <div className="flex gap-2 items-center my-4">
                <TerminalIcon />
                <p className="font-main">Hackathons</p>
              </div>
              <div className="flex gap-2">
                {user?.hackathons &&
                  JSON.parse(user?.hackathons).map((language: any, i: any) => {
                    return (
                      <button className="px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 text-white">
                        <p className="font-main text-xs">{language}</p>
                      </button>
                    );
                  })}
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </AuthRedirect>
  );
};
