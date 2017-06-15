/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import ResponsiveTable from '../ResponsiveTable';
import * as OverlayActions from '../../../actions/Overlay'
import * as AppointmentsApi from '../../../api/Appointments';
import * as AppointmentsActions from '../../../actions/Appointments';
import * as AppointmentActions from '../../../actions/Appointment';
import AddAppointmentOverlay from './AddAppointmentOverlay';
import Fab from '../../Buttons/Fab';
import { toastr } from 'react-redux-toastr';


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
    display: 'Provider Name',
    key: 'providerName'
  },
  {
    display: 'Phone number',
    key: 'phoneNumber'
  },
  {
    display: 'Date',
    key: 'date'
  },
  {
    display: 'Time',
    key: 'time'
  },
]


class Appointments extends Component {
  async componentDidMount() {
    const { companyId, setAppointments } = this.props;
    console.log('componentDidMount()');
    try {
      const payload = await AppointmentsApi.getAllByCompanyId(companyId);
      console.log(payload)
      if (payload.error) {

        toastr.error('Error fetching appointments try again later');
        return;
      }

      setAppointments(payload);
      // Do stuff with payload, probably send an action to populate state

    } catch (e) {
      toastr.error('Error fetching appointments try again later');
    }

  }



  render() {
    const {
      hideOverlay,
      showAddAppointmentOverlay,
      overlayMode,
      isOverlayVisible,
      appointmentList,
      companyId
    } = this.props;
    console.log('appointmentList', appointmentList);
    return (
      <div className="stage">
        <SectionHeader text="Appointments"/>
        <div className="tableContainer withFab">
          <ResponsiveTable
            rows={appointmentList}
            headers={headers}
            containerClassName="tableContainer"
          />
        </div>
        <AddAppointmentOverlay
          isVisible={isOverlayVisible && overlayMode === 'ADD_APPOINTMENT'}
          hideOverlay={hideOverlay}
          companyId={companyId}
        />
        <Fab
          location="BOTTOM_RIGHT"
          options={[
            {
              text: 'Add appointment',
              onClick: () => showAddAppointmentOverlay(),
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
  companyId: s.company.id,
  appointmentList: s.appointments.list,
});

const dispatchToProps = (d) => ({
  showAddAppointmentOverlay: () => d(OverlayActions.showOverlay('ADD_APPOINTMENT')),
  hideOverlay: (appointment) => {
    console.log("in this hide overlay")
    console.log(appointment)
    d(OverlayActions.hideOverlay())
    if (appointment) {
      d(AppointmentActions.addAppointment(appointment))
    }
  },
  setAppointments: appointments => d(AppointmentsActions.set(appointments)),
});

Appointments = connect(stateToProps, dispatchToProps)(Appointments);
export default Appointments;
