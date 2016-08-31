import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import VaultSettingsBar from './components/VaultSettingsBar';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginScreen} />
    <Route path="/main" component={MainScreen}>
      <Route path="/vault/:vault-id" components={{ sidebar: VaultSettingsBar }} />
      <IndexRoute components={{ sidebar: VaultSettingsBar }} />
    </Route>
  </Route>
);
