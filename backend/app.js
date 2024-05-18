// Import the express module
import express from 'express';
import githubUsername from 'github-username';

// Create an instance of the express application
const app = express();

// Specify a port number for the server
const port = 5000;

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a route and a handler for GET /githubemail
app.post('/github', (req, res) => {
  // Send the posts array as a JSON response

  async function fetchGithub() {
    const v = await githubUsername('jay.jrjren@gmail.com');
    console.log(v);
  }
  fetchGithub();

  res.status(200).json({ hello: 'word' });
});
