import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SettingsBar from './components/SettingsBar';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginScreen} />
    <Route path="/main" component={MainScreen}>
      <Route path="/vault/:vault-id" components={{ sidebar: SettingsBar }} />
      <IndexRoute components={{ sidebar: SettingsBar }} />
    </Route>
  </Route>
);
