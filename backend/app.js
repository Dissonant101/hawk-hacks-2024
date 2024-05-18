// Import the express module
import express from 'express';
import githubUsername from 'github-username';
import cors from 'cors';
import { FRONTEND_URL } from '../src/constant';

// Create an instance of the express application
const app = express();

app.use(cors());

var corsOptions = {
  origin: FRONTEND_URL,
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

  console.log(req);

  async function fetchGithub() {
    const v = await githubUsername();
    console.log(v);
  }
  fetchGithub();

  res.status(200).json({ hello: 'word' });
});
