import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import rest from './api';
import configureStore from './store/configureStore';

import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(rest.actions.auth.check((err, data) => {
    if (data.connected) {
        history.push('/main');
    }
    else {
        history.push('/');
    }
}));

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
