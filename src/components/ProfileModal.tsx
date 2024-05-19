import { useEffect, useState } from 'react';
import { Avatar, Card } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';
import axios from 'axios';

export const ProfileModal = (props: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function test() {
      const result = await axios.get(
        'https://us-east-2.aws.neurelo.com/rest/users/' + props.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY':
              'neurelo_9wKFBp874Z5xFw6ZCfvhXYgW+6IrvRGB88Iaa4knlm2zOF/nakrV/jSrVszE2WKDcf6S6+ooTEHQrgYgjMWtj++yCOV/Lp7hhorR0HGRrU3zoYKG0E4LVMuqD21mEtT4d/rtJeIWQY4yEA8lYlLa6ZjekJjhcE6fbcPmEnOxjHI5QBKYyvA/JSSKTs6R+gPU_6IhO4QlrTFhy/Fn5eJ9LuEBO0SAsyevH05G8s7U1QPg=',
          },
        },
      );

      console.log(result);
      setUser(result.data.data);

      //   const resultJSON = await result;
    }
    test();
  }, []);

  return (
    <Card className="mt-24">
      <div className="p-8">
        <div className="flex gap-2 justify-center items-center mb-4">
          <Avatar alt={user?.first_name} src={user?.github_profile_src} />{' '}
          <p className="font-main">
            {user?.first_name} {user?.last_name} | {user?.location}
          </p>
        </div>
        <p className="font-main text-center text-sm">{user?.email}</p>
        <div className="flex justify-center py-4">
          <img src={user?.img_src} className="w-[100px] rounded-xl"></img>
        </div>
        <p className="text-center text-sm text-slate-500 mt-2">{user?.bio}</p>
        <div className="flex gap-2 items-center my-4">
          <CodeIcon />
          <p className="font-main">Languages</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
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
        <div className="flex gap-2 flex-wrap justify-center">
          {user?.hackathons &&
            JSON.parse(user?.hackathons).map((language: any, i: any) => {
              return (
                <button className="px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 text-black">
                  <p className="font-main text-xs">{language}</p>
                </button>
              );
            })}
        </div>
      </div>
    </Card>
  );
};
