import React, { Component } from 'react';
import colors from '../../colors';
import Card from '../Overlay/Card';
import Input from '../Input/TextInputBox';
import RaisedButton from '../Buttons/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const features = [
  {
    header: 'Automated Check-in',
    iconSrc: require('../../img/features/administrator.svg'),
    content: 'Minimize the work of your receptionist or completely replace '
      + 'them',
  },
  {
    header: 'Customizable',
    iconSrc: require('../../img/features/check-mark.svg'),
    content: 'Change the look, feel, and content of your forms through our '
    + 'Form Builder'
  },
];


class FeaturesOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    }
  }

  previousClick() {
    this.state.step -= 1;
    this.forceUpdate();
  }
  nextClick() {
    this.state.step += 1;
    this.forceUpdate();
  }

  render() {
    const {
      isVisible,
      hideOverlay,
    } = this.props;

    const currentFeature = features[this.state.step];

    return (
      <Card
        isVisible={isVisible}
        hideOverlay={hideOverlay}
      >
        <img
          className="featureIcon"
          src={currentFeature.iconSrc}
        />
        <h2 className="featuresHeader">
          {currentFeature.header}
        </h2>
        <p className="featuresContent">
          {currentFeature.content}
        </p>
        <div className="r around" style={{marginTop: 30}}>
          <RaisedButton
            secondary
            disabled={this.state.step === 0}
            label="Previous"
            onTouchTap={this.previousClick.bind(this)}
          />
          <p className="featureStep">
            {this.state.step + 1} / {features.length}
          </p>
          <RaisedButton
            secondary
            disabled={this.state.step + 1 === features.length}
            label="Next"
            onTouchTap={this.nextClick.bind(this)}
          />
        </div>
      </Card>
    );

  }
}

export default FeaturesOverlay;