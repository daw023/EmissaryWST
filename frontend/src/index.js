/**
 * @author Anthony Altieri on 6/4/17.
 *
 */

import ReactDOM from 'react-dom';
import React from 'react';
import Root from './components/Root.js';
import configureStore from './configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './style/font-awesome.min.css';
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

if (process.env.NODE_ENV !== 'production') {
  require('./style/style.scss');
}

injectTapEventPlugin();

const store = configureStore(history);
if (process.env.NODE_ENV === 'development') {
  module.hot.accept();
}


ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);

