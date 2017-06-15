import React from 'react';
import colors from '../../colors';
import Card from '../Overlay/Card';
import Input from '../Input/TextInputBox';
import RaisedButton from '../Buttons/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const PricingOverlay = ({ isVisible, hideOverlay }) => {
  return (
    <Card
      scrollable
      isVisible={isVisible}
      hideOverlay={hideOverlay}
    >
      <div className="priceBoxContainer">
        <div className="priceBox" style={{marginTop: 18}}>
          <p className="priceHeader">Subscription</p>
          <ul>
            <li>Unlimited visitors and employees</li>
            <li>Sync employees with Slack</li>
            <li>Form Builder - Customizable check-in forms</li>
          </ul>
        </div>
        <p className="price"><span className="money">$20</span>/ month</p>
      </div>

      <div className="priceBoxContainer">
        <div className="priceBox trial" style={{marginTop: 18}}>
          <p className="priceHeader trial">Free Trial</p>
          <ul>
            <li>Try Emissary for two weeks</li>
            <li>Easy sign up process, be ready in no time</li>
            <li>All features available in trial</li>
          </ul>
        </div>
        <p className="price">Free</p>
      </div>

    </Card>
  );
}

export default PricingOverlay