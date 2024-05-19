import { Button, Container, Divider, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../hooks/useUser';

// useEffect(() => {
//   const interval = setInterval(() => {
//     axios.get('http://localhost:5000').then((res) => setMessages(res.data));
//   }, 1000);
//   return () => {
//     clearInterval(interval);
//   };
// });
// const post_message = {
//   senderId: auth.user.userId,
//   teamId: auth.user.teamId,
//   message: innerHtml,
// };
// axios.post('http://localhost:5000', post_message);
// axios
//   .get('https://us-east-2.aws.neurelo.com/rest/invites', {
//     headers: {
//       'X-API-KEY':
//         'neurelo_9wKFBp874Z5xFw6ZCfvhXYgW+6IrvRGB88Iaa4knlm2zOF/nakrV/jSrVszE2WKDcf6S6+ooTEHQrgYgjMWtj++yCOV/Lp7hhorR0HGRrU3zoYKG0E4LVMuqD21mEtT4d/rtJeIWQY4yEA8lYlLa6ZjekJjhcE6fbcPmEnOxjHI5QBKYyvA/JSSKTs6R+gPU_6IhO4QlrTFhy/Fn5eJ9LuEBO0SAsyevH05G8s7U1QPg=',
//       'Content-Type': 'application/json',
//     },
//     params: {
//       filter: {
//         recipient_id: {},
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   });

const Team = ({
  users,
  onAccept,
}: {
  users: any[];
  onAccept: (id: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="flex flex-between">
      <div className="flex -space-x-1">
        {users.map((user) => (
          <div className="rounded-full size-8">
            <img src={user.github_profile_src as string} />
          </div>
        ))}
      </div>
      {/* <button
        className="bg-pink-400 rounded-full size-10"
        aria-label={id}
        onClick={handleClick}
      >
        settings
      </button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="p-2 bg-white">
          <Button
            onClick={() => onAccept(users[0].team_id)}
            variant="contained"
          >
            Kick
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export const InviteViewer = () => {
  const { user, loading } = useUser();
  // List of list of users
  const [teamUsers, setTeamUsers] = useState<any[][]>([]);

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

  function onAccept(_: number) {}

  return (
    <div className="p-4">
      <div className="flex justify-start gap-4 p-4">
        {teamUsers.map((users: any[], i) => (
          <Team users={users} onAccept={onAccept} key={i} />
        ))}
        {teamUsers.length === 0 && "You don't have any invites."}
      </div>
      <Divider />
    </div>
  );
};
