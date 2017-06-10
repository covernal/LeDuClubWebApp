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

//TODO: Uncomment the following lines of code when the nodechef environment variables are set correctly, and comment the next following two lines out
//let app_id = (process.env.REACT_WEBPACK_ENV != 'local' ? process.env.LEANCLOUD_APP_ID : ServerConfig.leancloud[process.env.REACT_WEBPACK_ENV].LEANCLOUD_APP_ID);
//let app_key = (process.env.REACT_WEBPACK_ENV != 'local' ? process.env.LEANCLOUD_APP_KEY : ServerConfig.leancloud[process.env.REACT_WEBPACK_ENV].LEANCLOUD_APP_KEY);
let app_id = ServerConfig.leancloud['dist'].LEANCLOUD_APP_ID;
let app_key = ServerConfig.leancloud['dist'].LEANCLOUD_APP_KEY;

//console.log('ENV = ' + process.env.REACT_WEBPACK_ENV );
//console.log('app id = ' + app_id);
//console.log('app key = ' + app_key);

AV.init({
  appId: app_id,
  appKey: app_key
});

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);
