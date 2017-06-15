/**
 * @author Anthony Altieri on 6/4/17.
 */
import React from 'react';
import Button from './Button';
import { toastr } from 'react-redux-toastr';

const Buttons = ({
  isSmall,
  navigate,
}) => (
  <div className="buttons">
    <Button
      isSmall={!!isSmall}
      label="Metrics"
      onTouchTap={() => navigate('/employee/metrics')}
    />
    <Button
      isSmall={!!isSmall}
      label="Visitors"
      onTouchTap={() => navigate('/employee/visitors')}
    />
    <Button
      isSmall={!!isSmall}
      label="Employees"
      onTouchTap={() => navigate('/employee/employees')}
    />
    <Button
      isSmall={!!isSmall}
      label="Appointments"
      onTouchTap={() => navigate('/employee/appointments')}
    />
    <Button
      isSmall={!!isSmall}
      label="Forms"
      onTouchTap={() => navigate('/employee/forms')}
    />
    <Button
      isSmall={!!isSmall}
      label="Settings"
      onTouchTap={() => navigate('/employee/settings')}
    />
  </div>
);

export default Buttons;
