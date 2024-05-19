import { Button, Divider, Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../hooks/useUser';

const Team = ({
  users,
  onAccept,
}: {
  users: any[];
  onAccept: (id: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex -space-x-6">
        {users.map((user) => (
          <img
            src={user.github_profile_src as string}
            className="rounded-full shadow-sm shadow-gray-600 size-12"
          />
        ))}
      </div>
      <div>
        {users.map((user) => (
          <p>{user.first_name}</p>
        ))}
      </div>
      <div>
        <button
          className="px-4 py-1 bg-pink-400 rounded-full outline "
          onClick={users.length ? () => onAccept(users[0].team_id) : undefined}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export const InviteViewer = () => {
  const { user, loading } = useUser();
  // List of list of users
  const [teamUsers, setTeamUsers] = useState<any[][]>([]);
  const [accepted, setAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return;

    (async () => {
      // List of invites
      const invites = await axios.get(
        'https://us-east-2.aws.neurelo.com/rest/invites',
        {
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            'Content-Type': 'application/json',
          },
          params: {
            filter: JSON.stringify({
              recipient_id: user.id,
            }),
          },
        },
      );

      const teamUsers: any[][] = await Promise.all(
        invites.data.data.map(({ team_id }: { team_id: number }) =>
          axios
            .get('https://us-east-2.aws.neurelo.com/rest/users', {
              headers: {
                'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
                'Content-Type': 'application/json',
              },
              params: {
                filter: JSON.stringify({
                  team_id,
                }),
              },
            })
            .then((res) => res.data.data),
        ),
      );

      setTeamUsers(teamUsers);
    })();
  }, [loading]);

  async function onAccept(team_id: number) {
    await axios
      .patch(
        'https://us-east-2.aws.neurelo.com/rest/users/' + user.id,
        { team_id },
        {
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(console.log);
    setAccepted(true);
    await axios.delete(
      'https://us-east-2.aws.neurelo.com/rest/invites',

      {
        headers: {
          'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
          'Content-Type': 'application/json',
        },
        params: {
          filter: JSON.stringify({ recipient_id: user.id, team_id }),
        },
      },
    );
  }

  return (
    <div className="p-4 rounded-md bg-slate-100">
      <div className="flex flex-col justify-start gap-4 p-4">
        {accepted
          ? "You've accepted the invite!"
          : teamUsers.length
            ? teamUsers.map((users: any[], i) => (
                <Team users={users} onAccept={onAccept} key={i} />
              ))
            : "You don't have any invites."}
      </div>
      <Divider />
    </div>
  );
};
