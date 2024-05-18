import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BlurOnIcon from '@mui/icons-material/BlurOn';
export const Footer = () => {
	return (
		<div className="p-4 bg-pink-400 shadow-sm flex justify-evenly">
			<GroupsIcon></GroupsIcon>
			<BlurOnIcon></BlurOnIcon>
			<PersonIcon></PersonIcon>
		</div>
	)
}
