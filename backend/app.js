// Import the express module
import express from 'express';
import githubUsername from 'github-username';
import cors from 'cors';

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

// Create a route and a handler for GET /githubemail
app.post('/github', cors(corsOptions), (req, res) => {
  // Send the posts array as a JSON response

  async function fetchGithub() {
    const username = await githubUsername(req.body.email);
    const userData = await fetch('https://api.github.com/users/' + username);
    const userJSON = await userData.json();
    const { avatar_url, name, location, bio } = userJSON;

    const repoData = await fetch(
      'https://api.github.com/users/' + username + '/repos',
    );
    const repoJSON = await repoData.json();
    console.log(repoJSON);
  }
  fetchGithub();

  res.status(200).json({ hello: 'word' });
});
