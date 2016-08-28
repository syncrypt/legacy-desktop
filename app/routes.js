import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MainScreen from './containers/MainScreen';
import LoginScreen from './containers/LoginScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginScreen} />
    <Route path="/main" component={MainScreen} />
  </Route>
);
