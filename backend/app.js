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
          id: Math.floor(Math.random() * 100000000 + 100),
          first_name: req.body.first,
          last_name: req.body.last,
          github_username: username,
          github_profile_src: avatar_url,
          location: location,
          bio: bio,
          languages: JSON.stringify(repoList),
        }),
      },
    );

    const resultData = await result.json();

    return result;

    // Fetch ALL Languages
    // for (var i = 0; i < repoJSON.length; i++) {
    //   var languages = await fetch(repoJSON[i].languages_url);
    //   languages = await languages.json();
    //   var keys = Object.keys(languages);
    //   console.log(keys);
    //   for (var j = 0; j < keys.length; j++) {
    //     if (keys[j] in repos) {
    //       repos[keys[j]] += languages[keys[j]];
    //     } else {
    //       repos[keys[j]] = languages[keys[j]];
    //     }
    //   }
    //   repoList.push(languages);
    // }
  }
  fetchGithub();

  res.status(200).json({ test: 'test' });
});
