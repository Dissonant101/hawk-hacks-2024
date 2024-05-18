import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Link } from "react-router-dom";
export const Footer = () => {
	return (
		<div className="p-10 bg-pink-400 shadow-sm flex justify-evenly">
			<Link to={'/team'}>
				<GroupsIcon className='hover:opacity-50' fontSize='large'></GroupsIcon>
			</Link>
			<Link to={'/'}>
				<BlurOnIcon className='hover:opacity-50' fontSize='large'></BlurOnIcon>
			</Link>
			<Link to={'/profile'}>
				<PersonIcon className='hover:opacity-50' fontSize='large'></PersonIcon>
			</Link>
		</div>
	)
}
