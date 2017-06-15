/**
 * @author Anthony Altieri on 6/10/17.
 */

import Appointment from './Appointment';

const initialState = {
  list: [],
};

const Appointments = (state = initialState, action) => {
  switch(action.type) {

    case 'APPOINTMENTS_SET':
      return { ...state, list: action.appointments };

    case 'APPOINTMENT_ADD':
      return { ...state, list: [...state.list, action.appointment]}

    default:
      return state;
  }
};

export default Appointments;