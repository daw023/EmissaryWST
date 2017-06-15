/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import * as OverlayActions from '../../actions/Overlay';
import Paper from 'material-ui/Paper';
import Buttons from './Buttons';
import Hamburger from './Hamburger';
import OverlayCard from '../Overlay/Card';
import RaisedButton from '../Buttons/RaisedButton';

const brandLogoSrc = require('../../img/logo-emissary.png');

class Header extends Component {
  render() {
    const {
      pathname,
      navigate,
      navigateAndHideOverlay,
      isOverlayVisible,
      overlayMode,
      hideOverlay,
      showOverlay,
    } = this.props;


    return (
      <div>
        <Paper zDepth={2} className="header">
          <div className="container">
            <div className="r fullheight">
              <img
                src={brandLogoSrc}
                className="brandLogo"
                onTouchTap={() => navigateAndHideOverlay('/welcome')}
              />
              <h1
                className="brand"
                onTouchTap={() => navigateAndHideOverlay('/welcome')}>
                Emmisary
              </h1>
            </div>
            <Buttons navigate={navigate} />
            <Hamburger
              onTouchTap={() => showOverlay('EMPLOYEE_NAV')}
            />
          </div>
        </Paper>
        <OverlayCard
          isVisible={isOverlayVisible && overlayMode === 'EMPLOYEE_NAV'}
          hideOverlay={hideOverlay}
        >
          <RaisedButton
            label="Metrics"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/metrics')}
            primary
          />
          <RaisedButton
            label="Visitors"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/visitors')}
            primary
          />
          <RaisedButton
            label="Employees"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/employees')}
            primary
          />
          <RaisedButton
            label="Appointments"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/appointments')}
            primary
          />
          <RaisedButton
            label="Forms"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/forms')}
            primary
          />
          <RaisedButton
            label="Settings"
            className="headerOverlayButton"
            onTouchTap={() => navigateAndHideOverlay('/employee/settings')}
            primary
          />
        </OverlayCard>
      </div>
    );
  }
}

const stateToProps = (s) => ({
  pathname: s.router.location.pathname,
  overlayMode: s.overlay.mode,
  isOverlayVisible: s.overlay.isVisible,
});

const dispatchToProps = (d) => ({
  navigate: (url) => d(push(url)),
  navigateAndHideOverlay: (url) => {
    d(push(url));
    d(OverlayActions.hideOverlay());
  },
  showOverlay: (mode) => d(OverlayActions.showOverlay(mode)),
  hideOverlay: () => d(OverlayActions.hideOverlay()),
});

Header = connect(stateToProps, dispatchToProps)(Header);
export default Header;
