import { Card, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export const Body = () => {
  return (
    <div className="grow bg-pink-200 flex justify-center items-center">
      <Card>
        <GoogleIcon />
        <TextField />
      </Card>
    </div>
  );
};
