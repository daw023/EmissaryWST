/**
 * @author Anthony Altieri on 6/4/17.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import Visitor from './Visitor';
import Window from './Window';
import Overlay from './Overlay';
import Credentials from './Credentials'
import Company from './Company';
import Appointments from './Appointments';
import Appointment from './Appointment';

const root = combineReducers({
  router: routerReducer,
  toastr: toastrReducer,
  visitor: Visitor,
  window: Window,
  overlay: Overlay,
  credentials: Credentials,
  company: Company,
  appointments: Appointments,
});

export default root;
