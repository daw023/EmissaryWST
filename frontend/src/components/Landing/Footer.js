import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './FooterButton';
import * as OverlayActions from '../../actions/Overlay'
import Fab from '../Buttons/Fab';
import * as WindowActions from '../../actions/Window';
import { MOBILE, TABLET, DESKTOP } from '../../dimens';
import throttle from 'lodash/throttle';
import FeaturesOverlay from './FeaturesOverlay';
import PricingOverlay from './PricingOverlay';
import LoginOverlay from './LoginOverlay';
import SignupOverlay from './SignupOverlay';

class Footer extends Component {
  componentDidMount() {
    const { windowResize } = this.props;

    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      windowResize(windowWidth, windowHeight);
    };
    handleWindowResize();

    this.oldOnResize = window.onresize;

    const ONE_TENTH_SECOND = 100;
    const f = throttle(() => {
      handleWindowResize();
    }, ONE_TENTH_SECOND);
    window.onresize = () => {
      if (this.oldOnResize) {
        this.oldOnResize();
      }
      console.log('window onresize()');
      f();
    }
  }

  componentWillUnmount() {
    window.onresize = this.oldOnResize;
  }

  onFeaturesClick() {
    this.props.showOverlay('FEATURES');
  }
  onPricingClick() {
    this.props.showOverlay('PRICING');
  }
  onLogInClick() {
    this.props.showOverlay('LOG_IN');
  }
  onSignUpClick() {
    this.props.showOverlay('SIGN_UP');
  }


  render() {
    const {
      mode,
      overlayMode,
      isOverlayVisible,
      hideOverlay,
      showOverlay,
    } = this.props;
    console.log('Footer render')
    console.log('props', this.props);

    let buttonContent = null;

    if (mode === MOBILE) {
      buttonContent = (
        <Fab
          isMobile
          location="BOTTOM_RIGHT"
          options={[
            {
              text: 'Features',
              onClick: () => (this.onFeaturesClick.bind(this))()
            },
            {
              text: 'Pricing',
              onClick: () => (this.onPricingClick.bind(this))(),
            },
            {
              text: 'Log in',
              onClick: () => (this.onLogInClick.bind(this))(),
            },
            {
              text: 'Sign up',
              onClick: () => (this.onSignUpClick.bind(this))(),
            },
          ]}
        />
      )
    } else {
      buttonContent = (
        <div className="landingFooter">
          <Button
            label="Features"
            onTouchTap={() => (this.onFeaturesClick.bind(this))()}
          />
          <Button
            label="Pricing"
            onTouchTap={() => (this.onPricingClick.bind(this))()}
          />
          <Button
            label="Log in"
            onTouchTap={() => (this.onLogInClick.bind(this))()}
          />
          <Button
            label="Sign up"
            onTouchTap={() => (this.onSignUpClick.bind(this))()}
          />
        </div>
      );

    }

    return (
      <div>
        <FeaturesOverlay
          isVisible={isOverlayVisible && overlayMode === 'FEATURES'}
          hideOverlay={hideOverlay}
        />
        <PricingOverlay
          isVisible={isOverlayVisible && overlayMode === 'PRICING'}
          hideOverlay={hideOverlay}
        />
        <LoginOverlay
          isVisible={isOverlayVisible && overlayMode === 'LOG_IN'}
          hideOverlay={hideOverlay}
          showOverlay={showOverlay}
        />
        <SignupOverlay
          isVisible={isOverlayVisible && overlayMode === 'SIGN_UP'}
          hideOverlay={hideOverlay}
          showOverlay={showOverlay}
        />
        {buttonContent}
      </div>
    )

  }
}

const stateToProps = s => ({
  mode: s.window.mode,
  overlayMode: s.overlay.mode,
  isOverlayVisible: s.overlay.isVisible,
});

const dispatchToProps = d => ({
  windowResize: (width, height) => d(WindowActions.resize(width, height)),
  showOverlay: (mode) => d(OverlayActions.showOverlay(mode)),
  hideOverlay: () => d(OverlayActions.hideOverlay()),
});

Footer = connect(stateToProps, dispatchToProps)(Footer);

export default Footer