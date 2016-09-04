import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import VaultSettingsBar from './components/VaultSettingsBar';
import AccountSettingsBar from './components/AccountSettingsBar';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginScreen} />
    <Route path="/main" component={MainScreen}>
        <IndexRoute components={{sidebar: AccountSettingsBar }} />
        <Route path="vault/:vault_id" components={{ sidebar: VaultSettingsBar }} />
    </Route>
  </Route>
);
