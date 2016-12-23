React Redux Universal Minimal Starter Kit
------------
Minimal starter kit (boilerplate) for universal React apps based on [fuglu/react-redux-boilerplate](https://github.com/fuglu/react-redux-boilerplatee).

What's inside
-------------
* react + react-router + redux + redux-saga
* [redux-wait-for-action](https://github.com/Chion82/redux-wait-for-action) to reuse sagas on server side
* express.js for server side rendering
* jest for test utils (No test scripts added by default)
* webpack configuration for both client and server side
* ESLint
* hot reload for both client and server side development

Usage
-----
Install:
```
npm install
```
Development:
```
npm run dev
open http://localhost:3001
```
Development (No server side rendering):
```
npm run dev:client
open http://localhost:3000
```
Build:
```
npm run build
node dist/server/index.js
```
