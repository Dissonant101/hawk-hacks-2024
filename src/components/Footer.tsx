import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { SignOutButton } from './auth/AuthComponents';

const iconStyle = {
  fontSize: 48,
  '&:focus': {
    fontSize: 56,
  },
};

export const Footer = () => {
  return (
    <div className="px-12 py-2 shadow-sm bg-opacity-50 bg-slate-500">
      <Container maxWidth="sm">
        <div className="flex justify-around">
          <Link to={'/team'}>
            <GroupsIcon
              className="transition hover:opacity-50"
              style={iconStyle}
            ></GroupsIcon>
          </Link>
          <Link to={'/'}>
            <BlurOnIcon
              className="hover:opacity-50 transition"
              style={iconStyle}
            ></BlurOnIcon>
          </Link>
          <Link to={'/profile'}>
            <PersonIcon
              className="hover:opacity-50 transition"
              style={iconStyle}
            ></PersonIcon>
          </Link>
          <SignOutButton />
        </div>
      </Container>
    </div>
  );
};
