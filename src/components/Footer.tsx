import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Link } from "react-router-dom";
export const Footer = () => {
	return (
		<div className="p-4 bg-pink-400 shadow-sm flex justify-evenly">
			<Link to={'/team'}>
				<GroupsIcon></GroupsIcon>
			</Link>
			<Link to={'/'}>
				<BlurOnIcon></BlurOnIcon>
			</Link>
			<Link to={'/profile'}>
				<PersonIcon></PersonIcon>
			</Link>
		</div>
	)
}
