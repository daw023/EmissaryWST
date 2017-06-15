import React from 'react';
import Button from '../Buttons/RaisedButton'
import colors from '../../colors';

const FooterButton = (props) => {
  return (
    <Button
      className="button"
      backgroundColor={colors.bright}
      labelColor={colors.white}
      {...props}
    />
  );
};

export default FooterButton