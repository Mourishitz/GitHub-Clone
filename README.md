
# GitHub Clone

This project is made as a part of Shawn and Partners code challenge.

- [API](https://github-clone-u9t6.onrender.com/api)
- [Web App](https://guthib-clone.web.app)

Fun fact: the domain name "guthib-clone.web.app" was inspired by the famous meme from "[guthib.com](https://guthib.com)", a website made only for joking with those who spell GitHub wrong.



## Features

- GitHub integration.
- Dynamic user and repository listing.
- Modern design and clean built application.


## Stack

**Front-end:** React, TailwindCSS, DaisyUI, Vite

**Back-end:** Bun, Typescript, Express, Docker


## Install

This project was developed using Bun but it is supported by NodeJS runtime and package manager. It is also available to run inside a Docker container.

```bash
  git clone https://github.com/Mourishitz/GitHub-Clone.git
  cd GitHub-Clone
```

Backend:
 ```bash
    cd server
    npm install
```

Frontend:
```bash
    cd server
    npm install
```

   
## Running Tests

On this release, only integrations are tested on Backend. It uses Jest as test runner.

```bash
  cd server
  npm run test
```


## Running

Afeter installing the dependencies install as following:

#### This works for both Frontend and Backend server.

Create .env and run on development server:
```bash
  cp .env.example .env
  npm run dev
```

Build the project with:

```bash
  npm run build
  npm run prod
```

By default, backend will export **localhost:3000** and frontend on **localhost:5173**. If Docker is used than you can remap port 3000 to your local ports as you like.
## Environment

Create a .env file inside server directory containing this keys:

### Backend:

`BASE_URL` = Domain running the backend service.

`GITHUB_TOKEN` = API Token so GitHub doesn't rate limit your requests.

### Frontend:

`BACKEND_URL` = Backend host for making requests on client side.

You can copy the .env.example and rename it to easily configure both sides of application.
