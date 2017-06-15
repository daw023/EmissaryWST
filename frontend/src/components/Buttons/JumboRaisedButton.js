/**
 * @author Anthony Altieri on 6/4/17.
 */

import React from 'react';
import RaisedButton from './RaisedButton';

const JumboRaisedButton = ({
  labelStyle,
  ...props,
}) => (
  <RaisedButton
    labelPosition="after"
    labelStyle={{
      ...labelStyle,
      fontSize: 19,
      marginLeft: 12,
    }}
    buttonStyle={{
      height: 50,
    }}
    overlayStyle={{
      height: 50,
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  />
);

export default JumboRaisedButton;
