[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/DeMaCS-UNICAL/LoIDE-PWA/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/DeMaCS-UNICAL/LoIDE-PWA.svg)](https://github.com/DeMaCS-UNICAL/LoIDE-PWA/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/DeMaCS-UNICAL/LoIDE-PWA.svg)](https://github.com/DeMaCS-UNICAL/LoIDE-PWA/issues)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/DeMaCS-UNICAL/LoIDE-PWA)

# LoIDE-PWA

**Progressive Web App IDE for Logic Programming.**
![LoIDE web GUI](docs/screenshots/main-page.png)

Part of the [LoIDE](https://github.com/demacs-unical/loide) project – a web-based IDE for Logic Programming.

🌐 Project website: https://demacs-unical.github.io/LoIDE/


## Purpose

The primary objective of LoIDE-PWA is to develop a Progressive Web App (PWA) that serves as an Integrated Development Environment (IDE) for Logic Programming, leveraging modern technologies and languages.

## Key Features

- Syntax highlighting
- Output highlighting
- Layout and appearance customization
- Keyboard shortcuts
- Multiple file support
- Execution and Solvers options definition
- Import and Export files
- Easy to use on mobile devices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

To run LoIDE-PWA you need to have Node.js 22 and npm installed on your system.

We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to install and manage Node.js versions. Once nvm is installed, you can use the `.nvmrc` file in the project to automatically install the correct Node.js version:

```bash
nvm install
nvm use
```

If you want to use the server-side features of LoIDE, you need to have a server that can execute Logic programs. If you like it, you can use our [PythonESE](https://github.com/DeMaCS-UNICAL/PythonESE).

### Installation

To install LoIDE-PWA, first clone the repository using the following command:

```bash
git clone https://github.com/DeMaCS-UNICAL/LoIDE-PWA.git
```

Navigate to the cloned repository directory and install the required dependencies with npm:

```bash
npm install
```

### Configuration

Create a `.env.local` file in the root of the project to configure the LoIDE API server URL:

```bash
VITE_LOIDE_API_SERVER=your-api-server-url:8084
```

Replace `your-api-server-url:8084` with the actual URL of your LoIDE API server (e.g., `localhost:8084`).

Now you can run the application in development or production mode.

### Run in Development Mode

In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Run in Production Mode

```bash
npm run build

npm run start:prod
```

Builds the app for production to the `build` folder and start a server that serve the build.

Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

If you wish to run _LoIDE_ over HTTPS, you must provide paths to certificate files in the `server-config.json` file.
Then, you can start _LoIDE_ in a browser at [http://localhost:9001](http://localhost:9001)

### Testing

```bash
npm test
```

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

# Dockerization

This repository provides also Docker containerization for LoIDE PWA.
Docker enables the encapsulation of the LoIDE GUI within a lightweight, portable container, ensuring smooth deployment across various environments.

## Getting Started

Deploying the LoIDE GUI using Docker is straightforward:

### Installation

Ensure Docker is installed on your system (refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for installation instructions). Then, clone this repository using the following command:

```bash
git clone https://github.com/DeMaCS-UNICAL/LoIDE-PWA.git
```

### Building the Docker Image

A Docker image is a package that contains all the necessary to run application and it's used to create Docker containers. To create one navigate to the cloned repository directory and build the Docker image using the provided script:

```bash
./docker-build.sh
```

This script automatically extracts the version from `package.json` and tags the image accordingly (e.g., `loide-pwa:1.3.1` and `loide-pwa:latest`).

Alternatively, you can build manually:

```bash
docker build --build-arg APP_VERSION=$(node -p "require('./package.json').version") -t loide-pwa .
```

### Running the Docker Container

Once the Docker image is built, you can run a Docker container using the following command:

```bash
docker run -d -p 9000:9000 -e LOIDE_API_SERVER=your-api-server:8084 loide-pwa
```

#### Environment Variables

| Variable           | Description                                          | Default          |
| ------------------ | ---------------------------------------------------- | ---------------- |
| `LOIDE_API_SERVER` | URL of the LoIDE API server (e.g., `localhost:8084`) | `localhost:8084` |

#### Example

```bash
# Run with custom API server
docker run -d -p 9000:9000 -e LOIDE_API_SERVER=api.example.com:8084 loide-pwa

# Run with default API server
docker run -d -p 9000:9000 loide-pwa
```

#### Advanced: Custom Configuration

You can also mount a custom server configuration file:

```bash
docker run -d -p 9000:9000 \
  -e LOIDE_API_SERVER=your-api-server:8084 \
  --mount type=bind,source=/your/path/to/config,target=/app/config \
  loide-pwa
```

The `--mount type=bind,source=[your/path/to/config],target=/app/config` option is used to create a bind mount. A bind mount is a type of mount that allows you to map a host file or directory to a container file or directory (for more information refer to the [official Docker documentation](https://docs.docker.com/storage/bind-mounts/)).

The configuration file is a JSON file that contains the configuration of the LoIDE PWA. It must be placed in a directory on the host and the _full_ path to this directory must be specified in the source option of the --mount option. The JSON schema needs also to be in the same directory.

For examples on how to create the configuration file refer to the one provided in the repository. If no configuration file is provided the default configuration will be used.

Once the Docker container is running, you can open your web browser and navigate to `http://localhost:9000` to access the LoIDE GUI.

# Configuration

## server-config.json

This configuration file contains various settings for the server.

### Port

This section contains the ports that the server will listen on.

- `http`: The port for HTTP connections. Default is `9000`.
- `https`: The port for HTTPS connections. Default is `9001`.

### Path

This section contains the paths to the SSL certificate files for HTTPS.

- `key`: The path to the private key file.
- `cert`: The path to the certificate file.

### Rate_limit

This section contains settings for rate limiting to prevent abuse.

- `windowMs`: The duration in milliseconds for which requests are checked/remembered. Default is `600000` (10 minutes).
- `max`: Maximum number of connections during `windowMs` before sending a 429 response. Default is `1000`.

### Max_age

The maximum age, in seconds, for HTTP Strict Transport Security (HSTS). This is only applied when using HTTPS. Default is `31536000` (1 year).

## Versioning

We use [Semantic Versioning](http://semver.org) for versioning. For the versions available, see the [releases on this repository](https://github.com/DeMaCS-UNICAL/LoIDE-PWA/releases).

## Credits

- Stefano Germano (_Coordinator_)
- Rocco Palermiti
- Marco Duca

From the [Department of Mathematics and Computer Science](https://www.mat.unical.it) of the [University of Calabria](http://unical.it)

## License

This project is licensed under the [MIT License](LICENSE)
