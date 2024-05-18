import { Button, Container, Divider, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
  // If not logged in, redirect

  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch team members
    setTeamMembers([
      { id: 1, name: 'Joe' },
      { id: 2, name: 'Bob' },
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
