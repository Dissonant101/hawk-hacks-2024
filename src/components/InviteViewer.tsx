import { Button, Container, Divider, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
axios
  .get('https://us-east-2.aws.neurelo.com/rest/invites', {
    headers: {
      'X-API-KEY':
        'neurelo_9wKFBp874Z5xFw6ZCfvhXYgW+6IrvRGB88Iaa4knlm2zOF/nakrV/jSrVszE2WKDcf6S6+ooTEHQrgYgjMWtj++yCOV/Lp7hhorR0HGRrU3zoYKG0E4LVMuqD21mEtT4d/rtJeIWQY4yEA8lYlLa6ZjekJjhcE6fbcPmEnOxjHI5QBKYyvA/JSSKTs6R+gPU_6IhO4QlrTFhy/Fn5eJ9LuEBO0SAsyevH05G8s7U1QPg=',
      'Content-Type': 'application/json',
    },
    params: {
      filter: {
        recipient_id: {},
      },
    },
  })
  .then((res) => {
    console.log(res.data);
  });

const UserIcon = ({
  user,
  onKick,
}: {
  user: any;
  onKick: (id: number) => void;
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
    <>
      <button
        className="bg-pink-400 rounded-full size-10"
        aria-label={id}
        onClick={handleClick}
      >
        {/* User icon goes here */}
        {user.name}
      </button>
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
          <Button onClick={() => onKick(user.id as number)} variant="contained">
            Kick
          </Button>
        </div>
      </Popover>
    </>
  );
};

export const InviteViewer = () => {
  // If not logged in, redirect

  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch team members
    setTeamMembers([
      { id: 1, name: 'Greg' },
      { id: 2, name: 'Charles' },
    ]);
  }, []);

  function onKick(_: number) {}

  return (
    <div className="p-4">
      <div className="flex justify-start gap-4 p-4">
        {teamMembers.map((u) => (
          <UserIcon user={u} onKick={onKick} key={u.id} />
        ))}
      </div>
      <Divider />
    </div>
  );
};
