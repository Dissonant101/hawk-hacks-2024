import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Link } from 'react-router-dom';

const iconStyle = { fontSize: 48 };

export const Footer = () => {
  return (
    <div className="flex justify-between px-12 py-4 bg-pink-400 shadow-sm">
      <Link to={'/team'}>
        <GroupsIcon className="hover:opacity-50" style={iconStyle}></GroupsIcon>
      </Link>
      <Link to={'/'}>
        <BlurOnIcon className="hover:opacity-50" style={iconStyle}></BlurOnIcon>
      </Link>
      <Link to={'/profile'}>
        <PersonIcon className="hover:opacity-50" style={iconStyle}></PersonIcon>
      </Link>
    </div>
  );
};
