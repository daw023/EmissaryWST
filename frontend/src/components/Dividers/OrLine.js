/**
 * @author Anthony Altieri on 6/10/17.
 */

import React from 'react';

const OrLine = ({
  containerStyle,
  textContainerStyle,
  textStyle,
}) => (
  <div className="orLineContainer" style={containerStyle}>
      <span className="orLineTextContainer" style={textContainerStyle}>
        <span className="orLineText" style={textStyle}>or</span>
      </span>
  </div>
);

export default OrLine;