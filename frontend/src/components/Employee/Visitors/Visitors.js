/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import ResponsiveTable from '../ResponsiveTable';

const headers = [
  {
    display: 'First name',
    key: 'firstName'
  },
  {
    display: 'Last name',
    key: 'lastName'
  },
  {
    display: 'Appointment Time',
    key: 'appointmentTime'
  },
  {
    display: 'Check-In Time',
    key: 'checkInTime'
  },
]


class Visitors extends Component {
  render() {
    return (
      <div className="stage">
        <SectionHeader text="Visitors"/>
        <div className="tableContainer">
          <ResponsiveTable
            headers={headers}
            containerClassName="tableContainer"
          />
        </div>
      </div>
    );
  }
}

const stateToProps = (s) => ({});

const dispatchToProps = (d) => ({});

Visitors = connect(stateToProps, dispatchToProps)(Visitors);
export default Visitors;
 