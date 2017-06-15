/**
 * @author Anthony Altieri on 6/4/17.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const Hamburger = ({ style, ...props }) => (
  <IconButton id="hamburger" style={{ padding: 0 }} {...props}>
      <FontIcon className="material-icons" id="hamburgerIcon">
        menu
      </FontIcon>
  </IconButton>
);

export default Hamburger;
