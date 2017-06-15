/**
 * @author Anthony Altieri on 6/4/17.
 */
import React from 'react';
import MaterialFlatButton from 'material-ui/FlatButton';

const FlatButton = ({
  labelStyle,
  ...props,
}) => (
  <MaterialFlatButton
    labelStyle={{
      ...labelStyle,
      textTransform: 'none',
      fontWeight: 'bold',
    }}
    {...props}
  />
);

export default FlatButton;
