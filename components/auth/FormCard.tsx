import { Button, Card, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FormCard(props: any) {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [bio, setBio] = useState('');
  const [loc, setLoc] = useState('');

  useEffect(() => {
    setName(props?.props?.first_name);
    setLast(props?.props?.last_name);
    setBio(props?.props?.bio);
    setLoc(props?.props?.location);
  }, [props]);

  return (
    <div>
      <Card className="mt-12">
        <div className="p-8">
          <p className="text-3xl font-sans font-main font-extrabold mb-4 text-center">
            Sign Up Page
          </p>
          <div className="flex justify-between gap-4">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              className="w-full"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              className="w-full"
              value={bio}
              multiline
              maxRows={4}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              className="w-full mt-4"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                props.formSubmit(name, last, loc, bio);
              }}
              variant="contained"
              size="large"
              sx={{ width: '100px' }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
