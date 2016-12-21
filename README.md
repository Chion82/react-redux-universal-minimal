React Redux Universal Minimal Starter Kit
------------
Minimal starter kit (boilerplate) for universal React apps based on [fuglu/react-redux-boilerplate](https://github.com/fuglu/react-redux-boilerplatee).

What's inside
-------------
* react + react-router + redux + redux-saga (sagas are reused on server side)
* express.js for server side rendering
* jest + mocha for test utils (No test scripts added by default)
* webpack configuration for both client and server side
* ESLint
* hot reload for client side development

Usage
-----
Install:
```
npm install
```
Development:
```
npm run start
```
Development (No server side rendering):
```
npm run start:client
```
Build:
```
npm run build
node dist/server/index.js
```
