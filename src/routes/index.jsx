import React from 'react';
import { Router, Route } from 'react-router';
import IndexContainer from '../containers/IndexContainer';

const createRoutes = (history) => (
  <Router history={history} key={Math.random()}>
    <Route path="/" component={IndexContainer} />
  </Router>
);

export default createRoutes;
