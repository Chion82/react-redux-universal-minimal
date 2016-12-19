import React from 'react';
import { RouterContext, match } from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import ReactDOMServer from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import createRoutes from '../../routes';
import routesToRender from '../routes.js';
import renderFullPage from '../template.js';

require('isomorphic-fetch');

export default function(req, res, next) {

  if (routesToRender.filter(route => route.test(req.url)).length === 0) {
    next();
    return;
  }

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore({});
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes({ history });

  match({history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.send(500, error.message);
    } else if (renderProps == null) {
      res.send(404, 'Not found');
    } else {

      const getReduxPromise = () => {
        const component = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        const promise = component.fetchData ?
          component.fetchData(store.dispatch) :
          Promise.resolve();
        return promise;
      };

      getReduxPromise().then(() => {
        const initStateString = JSON.stringify(store.getState());
        const html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );
        res.send(200, renderFullPage(html, initStateString));
      }).catch((err) => {
        res.send(500, err);
      });

    }
  });

}
