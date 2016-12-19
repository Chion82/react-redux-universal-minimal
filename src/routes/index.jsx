import React from 'react';
import { Router, Route } from 'react-router';
import IndexContainer from '../containers/IndexContainer';
import ZenContainer from '../containers/ZenContainer';

const createRoutes = (props) => (
  <Router {...props}>
    <Route path="/" component={IndexContainer} />
    <Route path="/zen" component={ZenContainer} />
  </Router>
);

export default createRoutes;
