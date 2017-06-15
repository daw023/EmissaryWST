/**
 * @author Anthony Altieri on 6/10/17.
 */

import React from 'react';

const Line = ({ style, ...props}) => (
  <div className="lineContainer" {...props}>
    <div className="line"></div>
  </div>
);

export default Line;
