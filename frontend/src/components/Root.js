/**
 * @author Anthony Altieri on 6/4/17.
 */

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Route,
} from 'react-router-dom';
import { ConnectedRouter, syncHistoryWithStore } from 'react-router-redux';
import Colors from '../colors';
import {
  grey100,
  grey300,
  grey500,
  darkBlack,
  fullBlack,
} from '../../node_modules/material-ui/styles/colors';
import { resize } from '../actions/Window';
import { hideOverlay } from '../actions/Overlay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReduxToastr from 'react-redux-toastr';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from '../../node_modules/material-ui/utils/colorManipulator';
import Landing from './Landing/Landing';
import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import CheckIn from './Visitor/CheckIn/CheckIn';
import Visitors from './Employee/Visitors/Visitors';
import Metrics from './Employee/Metrics/Metrics';
import Appointments from './Employee/Appointments/Appointments';
import Employees from './Employee/Employees/Employees';
import Forms from './Employee/Forms/Forms';
import Settings from './Employee/Settings/Settings';



const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.primary,
    primary2Color: Colors.primaryDark,
    primary3Color: Colors.gray,
    accent1Color: Colors.secondary,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: Colors.dark,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: Colors.primaryLight,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  fontFamily: 'Lato, Helvetica, sans-serif',
  appbar: {
    height: 52,
  },
});

class Root extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(hideOverlay());
    dispatch(resize(window.innerWidth, window.innerHeight));
  }
  render() {
    const { store, pathname, history} = this.props;
    return (
      <Provider store={store}>
        <div className="fullscreen">
          <MuiThemeProvider muiTheme={muiTheme}>
            <ConnectedRouter history={history}>
              <div className="fullscreen">
                <Route exact path="/" component={Landing} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/visitor/checkIn" component={CheckIn} />
                <Route path="/employee" component={Header} />
                <Route exact path="/employee/appointments" component={Appointments} />
                <Route exact path="/employee/employees" component={Employees} />
                <Route exact path="/employee/forms" component={Forms} />
                <Route exact path="/employee/metrics" component={Metrics} />
                <Route exact path="/employee/visitors" component={Visitors} />
                <Route exact path="/employee/settings" component={Settings} />
              </div>
            </ConnectedRouter>
          </MuiThemeProvider>
          <ReduxToastr
            preventDuplicates
            timeOut={4000}
            newestOnTop={false}
            position="bottom-center"
          />
        </div>
      </Provider>
    )
  }
}
const stateToProps = (s) => ({
});
const dispatchToProps = (d) => ({
  dispatch: d,
});


Root = connect(stateToProps, dispatchToProps)(Root);

export default Root;
