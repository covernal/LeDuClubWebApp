require('jquery');
require('bootstrap-webpack');

if (process.env.BROWSER) {
  require('./styles/_app.less');
}

import React from 'react';
import {render} from 'react-dom';
import Root from './containers/Root';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';
import ServerConfig from '../cfg/NodeJS';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const AV = global.AV;

let app_id = (process.env.REACT_WEBPACK_ENV != 'local' ? process.env.LEANCLOUD_APP_ID : ServerConfig.leanclound[process.env.REACT_WEBPACK_ENV].LEANCLOUD_APP_ID);
let app_key = (process.env.REACT_WEBPACK_ENV != 'local' ? process.env.LEANCLOUD_APP_KEY : ServerConfig.leanclound[process.env.REACT_WEBPACK_ENV].LEANCLOUD_APP_KEY);

AV.init({
  appId: app_id,
  appKey: app_key
});

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);
