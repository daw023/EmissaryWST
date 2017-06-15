/**
 * @author Anthony Altieri on 6/4/17.
 */

import React from 'react';
import MaterialRaisedButton from 'material-ui/RaisedButton';

const RaisedButton = ({ labelStyle, ...props}) => (
  <MaterialRaisedButton
    labelStyle={{
      ...labelStyle,
      textTransform: 'none',
      fontWeight: 'bold',
    }}
    {...props}
  />
);

export default RaisedButton;

