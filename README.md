# Getting Started with MERN(MongoDB-Express-React-Node) Todo-App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `cd src/server && node index`

Runs the server and app in the production mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `docker build -t mern-todo-app .`

Create docker image with given Dockerfile.

### `sudo docker run -d -p 5000:5000 mern-todo-app:latest`

Run the created docker with exposed 5000.

### `docker-compose up`

Start app and mongodb docker.