import { Button, Container, Divider, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useTeam } from '../hooks/useTeam';
import axios from 'axios';

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

export const TeamManagement = () => {
  const { user, loading } = useUser();
  const { team, setTeam } = useTeam({ user, loading });

  function onKick(team_member_id: number) {
    if (team_member_id === user.id) return;

    // Kick the user from the team
    axios
      .patch(
        'https://us-east-2.aws.neurelo.com/rest/users/' + team_member_id,
        { team_id: team_member_id },
        {
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setTeam(team.filter((u) => u.id !== team_member_id));
      });
  }

  return (
    <div className="p-4">
      <div className="flex justify-start gap-4 p-4">
        {team.map((u) => (
          <UserIcon user={u} onKick={() => onKick(u.id)} key={u.id} />
        ))}
      </div>
      <Divider />
    </div>
  );
};
