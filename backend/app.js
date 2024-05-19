// Import the express module
import express from 'express';
import githubUsername from 'github-username';
import cors from 'cors';
import 'dotenv/config';

// Create an instance of the express application
const app = express();

app.use(cors());
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

// Specify a port number for the server
const port = 5000;

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

// Create a route and a handler for GET /githubemail
app.post('/github', cors(corsOptions), async (req, res) => {
  // Check if the email is already in the database
  // If it is, then we don't need to do anything
  const existing = await fetch(
    'https://us-east-2.aws.neurelo.com/rest/users?' +
      new URLSearchParams({
        filter: JSON.stringify({ email: req.body.email }),
      }),
    {
      headers: {
        'X-API-KEY': process.env.NEURELO_X_API_KEY,
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());
  if (existing.data.length > 0) {
    // console.log('ALready exists');
    res.status(200).json(existing.data[0]);
    return;
  }

  const username = await githubUsername(req.body.email);
  const userData = await fetch('https://api.github.com/users/' + username);
  const userJSON = await userData.json();
  const { avatar_url, name, location, bio } = userJSON;

  const repoData = await fetch(
    'https://api.github.com/users/' + username + '/repos',
  );
  const repoJSON = await repoData.json();

  console.log(repoJSON);

  var repoList = repoJSON.map((repo) => repo.language);
  repoList = [...new Set(repoList)];
  for (var i = 0; i < repoList.length; i++) {
    if (repoList[i] === null) {
      repoList.splice(i, 1);
    }
  }

  const result = await fetch(
    'https://us-east-2.aws.neurelo.com/rest/users/__one',
    {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.NEURELO_X_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: req.body.first,
        last_name: req.body.last,
        github_username: username,
        github_profile_src: avatar_url,
        location: location,
        bio: bio,
        languages: JSON.stringify(repoList),
        email: req.body.email,
      }),
    },
  );
  const resultData = await result.json();
  // console.log({ resultData });
  // Set team_id to be user.id
  const result2Data = await fetch(
    'https://us-east-2.aws.neurelo.com/rest/users/' + resultData.data.id,
    {
      method: 'PATCH',
      headers: {
        'X-API-KEY': process.env.NEURELO_X_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_id: resultData.data.id,
      }),
    },
  );
  // console.log({ result2Data });

  res.status(200).json(resultData.data);
});
