// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const reducers = keys.reduce((memo, key) => {
  memo[key.match(/([^\/]+)\.js$/)[1]] = context(key).default;
  return memo;
}, {});

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

export default rootReducer;
