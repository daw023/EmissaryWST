/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import ResponsiveTable from '../ResponsiveTable';
import Fab from '../../Buttons/Fab';
import AddEmployeeOverlay from './AddEmployeeOverlay';
import * as OverlayActions from '../../../actions/Overlay';

function transformEmployeeList(employeeList) {
  // TODO: implement, transform to our keys
  return employeeList;
}


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
    display: 'Phone number',
    key: 'phoneNumber'
  },
  {
    display: 'Email',
    key: 'email'
  },
]


class Employees extends Component {
  render() {
    const {
      isOverlayVisible,
      overlayMode,
      showAddEmployeeOverlay,
      employeeList,
      hideOverlay,
    } = this.props;

    return (
      <div className="stage">
        <SectionHeader text="Employees"/>
        <div className="tableContainer withFab">
          <ResponsiveTable
            rows={transformEmployeeList(employeeList)}
            headers={headers}
            containerClassName="tableContainer"
          />
        </div>
        <AddEmployeeOverlay
          isVisible={isOverlayVisible && overlayMode === 'ADD_EMPLOYEE'}
          hideOverlay={hideOverlay}
        />
        <Fab
          location="BOTTOM_RIGHT"
          options={[
            {
              text: 'Add employee',
              onClick: () => showAddEmployeeOverlay(),
            },
          ]}
        />
      </div>
    );
  }
}

const stateToProps = (s) => ({
  isOverlayVisible: s.overlay.isVisible,
  overlayMode: s.overlay.mode,
});

const dispatchToProps = (d) => ({
  showAddEmployeeOverlay: () => d(OverlayActions.showOverlay('ADD_EMPLOYEE')),
  hideOverlay: () => d(OverlayActions.hideOverlay()),
});

Employees = connect(stateToProps, dispatchToProps)(Employees);
export default Employees;
