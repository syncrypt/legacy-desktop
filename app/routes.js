import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import VaultSettingsBar from './components/VaultSettingsBar';
import AccountSettingsBar from './components/AccountSettingsBar';
import FeedbackSidebar from './components/FeedbackSidebar';
import WelcomeSidebar from './components/WelcomeSidebar';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginScreen} />
    <Route path="/main" component={MainScreen}>
        <IndexRoute components={{sidebar: WelcomeSidebar }} />
        <Route path="vault/:vault_id" components={{ sidebar: VaultSettingsBar }} />
        <Route path="feedback/" components={{ sidebar: FeedbackSidebar }} />
        <Route path="account/" components={{ sidebar: AccountSettingsBar }} />
    </Route>
  </Route>
);
