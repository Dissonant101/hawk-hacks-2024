import { Button } from '@mui/material';
import { useState } from 'react';

const interests = [
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'C++',
  'C#',
  'C',
  'Unity',
  'Python',
  'Java',
  'React',
  'NodeJS',
  'ExpressJS',
  'NextJS',
  'AWS',
  'SQL',
  'MongoDB',
  'BootStrap',
];
const hackathons = [
  'HawkHacks',
  'Hack the North',
  'The Golden Hack',
  'StormHacks',
  'uOttaHack',
  'DeerHack',
  'QHacks',
  'UofTHacks',
  'DeltaHacks',
  'Hack Western',
  'Hack the Valley',
  'McHacks',
  'nwHacks',
];

export default function Icons(props: any) {
  const languages = JSON.parse(props.lan);

  const [selectedInterests, setSelectedInterests] = useState(
    interests.map((val) => {
      if (languages.includes(val)) {
        return true;
      } else {
        return false;
      }
    }),
  );
  const [selectedHackathons, setSelectedHackathons] = useState(
    hackathons.map(() => false),
  );

  return (
    <div className="flex flex-col gap-4 pt-16">
      <div className="bg-white p-8 rounded-xl">
        <p className="text-black pt-0 pb-4 text-xl font-main">
          Programming Interests
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedInterests.map((_, i) => (
            <button
              className={
                'px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 text-md font-main ' +
                (selectedInterests[i] ? 'bg-pink-600 text-black' : 'text-black')
              }
              key={i}
              onClick={() => {
                const newSelectedInterests = [...selectedInterests];
                newSelectedInterests[i] = !newSelectedInterests[i];
                setSelectedInterests(newSelectedInterests);
              }}
            >
              {interests[i]}
            </button>
          ))}
        </div>
        <p className="text-black py-4 text-xl font-main">Hackathon Interests</p>
        <div className="flex flex-wrap gap-2">
          {hackathons.map((_, i) => (
            <button
              className={
                'px-2 rounded-full border border-pink-300 active:border-pink-500 active:bg-pink-800 text-md font-main ' +
                (selectedHackathons[i]
                  ? 'bg-pink-600 text-black'
                  : 'text-black')
              }
              key={i}
              onClick={() => {
                const newSelectedHackathons = [...selectedHackathons];
                newSelectedHackathons[i] = !newSelectedHackathons[i];
                setSelectedHackathons(newSelectedHackathons);
              }}
            >
              {hackathons[i]}
            </button>
          ))}
        </div>
        <div className="flex mt-4 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              var f1 = [];
              var f2 = [];
              for (var i = 0; i < selectedInterests.length; i++) {
                if (selectedInterests[i]) {
                  f1.push(interests[i]);
                }
              }
              for (var i = 0; i < selectedHackathons.length; i++) {
                if (selectedHackathons[i]) {
                  f2.push(hackathons[i]);
                }
              }
              props.onIconSubmit(f1, f2);
            }}
          >
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
}
