# AngularDockerInitApp

[![Tech Stack](https://skillicons.dev/icons?i=angular,typescript,nodejs,nginx,docker)](https://skillicons.dev)


<img width="1129" height="464" alt="AngularInitAppSuccess" src="https://github.com/user-attachments/assets/265ee577-4b2d-4a46-a3b4-2c4730c3516e" />

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

### Angular Docker App Creation Steps:

## Step 01: Node.js 20+ version

1. Install Node Version Manager (NVM)

### Download and run the NVM installation script
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```

### Source the NVM environment file (or open a new terminal)
```source ~/.bashrc```

### Installs the latest stable (LTS) version of Node.js.
```nvm install --lts```

### Verify the Update
```node -v```


## Step 02: Angular Project Setup

### Install Angular CLI if you haven't
```npm install -g @angular/cli```

### Create a new Angular project (without routing for simplicity)
```ng new angular-docker-app --style=scss --routing=false```

### Go into the project
```cd angular-docker-app```

### Verify it works locally
```ng serve```

## Step 03: Dockarize the app

### Create a file named Dockerfile at the root of your Angular project:
### Custom Nginx Configuration
### Build and Run the Docker Image

```docker build -t angular-web-image .```

```docker run -d -p 8080:80 --name angular-web-app angular-web-image```



