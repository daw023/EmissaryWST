/**
 * Created by abbas on 6/11/17.
 */


const initialState = {
  list: [],
};

const Appointment = (state = initialState, action) => {
  switch(action.type) {

    case 'APPOINTMENT_ADD':
      return { ...state, list: [...state.list, action.appointment] };


    default:
      return state;
  }
};

export default Appointment;
