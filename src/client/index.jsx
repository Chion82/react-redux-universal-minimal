import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store';
import ReactDOM from 'react-dom';

import '../stylesheets/core.scss';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);

const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  const createRoutes = require('../routes').default;

  ReactDOM.render(
    (<Provider store={store}>
      { createRoutes({
        history,
        key: Math.random()
      }) }
    </Provider>),
    document.getElementById('app')
  );
};

// eslint-disable-next-line
if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('../routes', () => {
    render();
  });
}

render();
