import React from 'react';
import Card from '../../Overlay/Card';
import Input from '../../Input/TextInputBox';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import colors from '../../../colors';

const AddEmployeeOverlay = ({
  isVisible,
  hideOverlay,
}) => {
  let firstName = '';
  let lastName = '';
  let phone = '';
  let email = '';

  return (
    <Card
      isVisible={isVisible}
      hideOverlay={hideOverlay}
    >
      <Input
        placeholder="First name"
        type="name"
        onChange={(e) => {
          firstName = e.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Last name"
        type="name"
        onChange={(e) => {
          lastName = e.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Phone number"
        type="phone"
        onChange={(e) => {
          phone = e.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Email"
        type="email"
        onChange={(e) => {
          email = e.target.value;
        }}
      />
      <br />
      <JumboRaisedButton
        label="Add"
        backgroundColor={colors.green}
        labelColor="#fff"
        onTouchTap={() => {
          // TODO: implement
        }}
      />
    </Card>
  );
}

export default AddEmployeeOverlay
