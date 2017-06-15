import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import UserType from './UserType';

let Welcome = ({
  goToCheckIn,
  goToEmployeeDashboard,
  companyName
}) => {
  return (
    <div className="stage">
      <h1 className="emissaryWelcome">Welcome to <span className="brandFont">{companyName}</span></h1>
      <p className="emissaryWhoAreYou">Who are you?</p>
      <p className="emissaryWhoAreYouHint">click one</p>
      <div className="r center">
        <UserType onClick={goToCheckIn} type="VISITOR" />
        <UserType onClick={goToEmployeeDashboard} type="EMPLOYEE" />
      </div>
    </div>
  );
};

const stateToProps = (s) => ({
  companyName: s.company.name,
});
const dispatchToProps = (d) => ({
  goToCheckIn: () => d(push('/visitor/checkIn')),
  goToEmployeeDashboard: () => d(push('/employee/metrics')),
});

Welcome = connect(stateToProps, dispatchToProps)(Welcome);
export default Welcome
