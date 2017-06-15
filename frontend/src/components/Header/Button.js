/**
 * @author Anthony Altieri on 6/4/17.
 */
import React from 'react';
import FlatButton from '../Buttons/FlatButton';
import colors from '../../colors';

const Button = ({ isSmall, ...props }) => (
  <FlatButton
    className={`button ${!!isSmall ? 'small' : ''}`}
    {...props}
    secondary
    style={{ margin: '0 4px', height: '100%', }}
    labelStyle={{ color: colors.dark , fontWeight: '400', fontSize: 16, }}
  />
);

export default Button;