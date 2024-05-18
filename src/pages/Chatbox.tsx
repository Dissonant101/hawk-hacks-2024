import { Card, TextField } from '@mui/material';

export const Chatbox = () => {
  return (
    <div className="grow bg-pink-200 flex justify-center items-center">
      <Card>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Card>
    </div>
  );
};