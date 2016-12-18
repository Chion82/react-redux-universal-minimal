import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store';
import ReactDOM from 'react-dom';

import '../stylesheets/core.scss';

const initialState = {};
const store = configureStore(initialState);

const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  const createRoutes = require('../routes').default;

  ReactDOM.render(
    (<Provider store={store}>
      {createRoutes(history)}
    </Provider>),
    document.getElementById('app')
  );
};

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('../routes', () => {
    render();
  });
}

render();
