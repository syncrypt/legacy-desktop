import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

import './app.global.css';
import { remote } from 'electron';
import path from 'path';
import child_process from 'child_process'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const appPath = path.dirname(remote.app.getAppPath());
const daemonPath = path.join(appPath, "app", "client", "syncrypt_daemon")
const daemonProcess = child_process.spawn(daemonPath);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
