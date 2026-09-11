## Steps for implementing the project


## Setup NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
## Reload shell

```
source ~/.bashrc
```

## Check NVM version, install & use Node 26

```
nvm --version
```

```
nvm install 26
```

```
nvm use 26
```

## Verify environment

```
node --version
npm --version
which node
```

### Go into the project:

```
cd mern-docker-crud
```

### Create directories

```
mkdir frontend
mkdir backend
```
### Create the frontend

```
cd frontend
```

### Create a Vite React application:

```
npm create vite@latest frontend -- --template react
```

## Install dependencies

```
npm install
```

## Add frontend file

```
nano src/App.jsx
```

## Replace main.jsx

```
nano src/main.jsx
```

###  Create the backend

```
cd backend
```

## Add package.json

```
touch package.json
```

Add packages to package.json


## Install dependencies

```
npm install
```

## Add server.js

```
touch server.js
```

## Test the React frontend build

```
npm run build
```