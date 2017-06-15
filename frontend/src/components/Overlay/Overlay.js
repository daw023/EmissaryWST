/**
 * @author Anthony Altieri on 6/4/17.
 */
import React from 'react';

const Overlay = ({
  isVisible,
  children,
  ...props
}) => !!isVisible
  ? (
    <div className="absoluteMiddle c center" style={{padding: '5vh 0'}}>
      {children}
      <div className="overlay" {...props}></div>
    </div>
  )
  : null;

export default Overlay;
