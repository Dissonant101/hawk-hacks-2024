# !Tinder

Project: https://taikai.network/hackbox/hackathons/hawkhacks/projects/clwdapbpv0d5wuc018qkfg1lq/idea

Demo: https://www.youtube.com/watch?v=Db8m7iPaM9M

## What it Does

Using a simple swiping mechanism and matching algorithm, !Tinder shows you potential teammates as well as their interests, hackathons attended, and technology skillsets. Swiping right adds them to your team, while swiping left moves you to the next potential teammate. Once you've found four teammates, you can connect and plan in the built-in chat. Happy hacking!

## Accomplishments That We're Proud Of

Our team was able to accomplish a high volume of high quality work, building out a polished final product to deployment, and this would not have been possible without our Scrum Master/Product Owner Nathan and his institution of a scrum calendar, hourly scrum meeting, and notion board ticketing system. While building good technology is impressive, being able to fully utilize our abilities and efficiently use time was a particular point of pride for us.

## Challenges We Ran Into

As much as we loved working on !Tinder, the road to success was rife with peril! A particularly contentious challenge for us was implementing teams within the !Tinder platform. We were unsure of how to efficiently manage teams and team chatting functionality, to the point that it almost divided our team and damaged relationships. However, with the power of friendship and perseverance, we were able to create a team_id attribute for our database tables and unify both our group and our technologies.

## How We Built It

We developed !Tinder with a react.js front-end, buttressed by Tailwind CSS, Typescript, Vite. On the back-end, we utilized a node.js express.js back-end that we used to query a Postgres database with Neurelon and Vercel.

## Our devposts:

https://devpost.com/JaryJay

https://devpost.com/nhnwong

https://devpost.com/Dissonant101

https://devpost.com/joshua-dierickse

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
