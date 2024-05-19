import { Layout } from './Layout';
import { useState } from 'react';
import AuthRedirect from '../components/auth/AuthRedirect';
import { useUser } from '../hooks/useUser';
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
          <div className="p-12 bg-pink-600 rounded-xl">
            {loading ? 'loading...' : user.first_name + ' ' + user.last_name}
            <br></br>
            {loading ? 'loading...' : user.loc}
            <br></br>
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
          <button
            className="bg-pink-600 p-4 rounded-xl"
            onClick={() => {
              interests.map((current_item, i) => {
                selectedInterests[i] ? console.log(current_item) : false;
              });
              hackathons.map((current_item, i) => {
                selectedHackathons[i] ? console.log(current_item) : false;
              });
              // async function onIconSubmit(lan: any, int: any) {
              //   const result = await fetch(
              //     'https://us-east-2.aws.neurelo.com/rest/users/' + (formState as any).id,
              //     {
              //       method: 'PATCH',
              //       headers: {
              //         'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY as string,
              //         'Content-Type': 'application/json',
              //       },
              //       body: JSON.stringify({
              //         languages: JSON.stringify(lan),
              //         hackathons: JSON.stringify(int),
              //       }),
              //     },
              //   );

              //   setPhase('out');
              // }
            }}
          >
            <p className="bg-center flex justify-center">Create your profile</p>
          </button>
        </div>
      </Layout>
    </AuthRedirect>
  );
};
