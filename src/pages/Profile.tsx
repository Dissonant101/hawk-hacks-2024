import { Layout } from './Layout';
import AuthRedirect from '../components/auth/AuthRedirect';
import { useUser } from '../hooks/useUser';
import { Avatar, Card } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';

export const Profile = () => {
  const { user } = useUser();

  return (
    <AuthRedirect>
      <Layout>
        <div className="flex flex-col gap-4 p-4">
          <Card>
            <div className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Avatar alt={user?.first_name} src={user?.github_profile_src} />{' '}
                <p className="font-main">
                  {user?.first_name} {user?.last_name} | {user?.location}
                </p>
              </div>
              <p className="text-sm text-center font-main">{user?.email}</p>
              <div className="flex justify-center py-4">
                <img src={user?.img_src} className="w-[100px] rounded-xl"></img>
              </div>
              <p className="mt-2 text-sm text-center text-slate-500">
                {user?.bio}
              </p>
              <div className="flex items-center gap-2 my-4">
                <CodeIcon />
                <p className="font-main">Languages</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {user?.languages &&
                  JSON.parse(user?.languages).map((language: any) => {
                    return (
                      <button className="px-2 text-white bg-pink-600 border border-pink-300 rounded-full active:border-pink-500 active:bg-pink-800">
                        <p className="text-xs font-main">{language}</p>
                      </button>
                    );
                  })}
              </div>
              <div className="flex items-center gap-2 my-4">
                <TerminalIcon />
                <p className="font-main">Hackathons</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {user?.hackathons &&
                  JSON.parse(user?.hackathons).map((language: any) => {
                    return (
                      <button className="px-2 text-black border border-pink-300 rounded-full active:border-pink-500 active:bg-pink-800">
                        <p className="text-xs font-main">{language}</p>
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
