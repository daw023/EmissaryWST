import React from 'react';
import colors from '../../../colors';
import Card from '../../Overlay/Card';
import Input from '../../Input/TextInputBox';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import { toastr } from 'react-redux-toastr';
import * as AppointmentsAPI from '../../../api/Appointments';
import moment from 'moment';

const AddAppointmentOverlay = ({
  isVisible,
  hideOverlay,
  addAppointment,
  companyId
}) => {

  let firstname = '';
  let lastname = '';
  let phoneNumber = '';
  let providerName = '';
  let date = null;
  let time = null;


  return (
    <Card
      isVisible={isVisible}
      hideOverlay={hideOverlay}
      addAppointment={addAppointment}
      companyId={companyId}
    >
      <Input
        placeholder="First name"
        type="name"
        inputRef={(node) => {
          if (!node) return;
          firstname = node.value;
        }}
        onChange={(event) => {
          firstname = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Last name"
        type="name"
        inputRef={(node) => {
          if (!node) return;
          lastname = node.value;
        }}
        onChange={(event) => {
          lastname = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Phone number"
        type="phonenumber"
        inputRef={(node) => {
          if (!node) return;
          phoneNumber = node.value;
        }}
        onChange={(event) => {
          phoneNumber = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Provider name"
        type="account"
        inputRef={(node) => {
          if (!node) return;
          providerName = node.value;
        }}
        onChange={(event) => {
          providerName = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Date"
        type="date"
        inputRef={(node) => {
          if (!node) return;
          date = node.value;
        }}
        onChange={(event) => {
          date = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Time"
        type="time"
        inputRef={(node) => {
          if (!node) return;
          time = node.value;
        }}
        onChange={(event) => {
          time = event.target.value;
        }}
      />
      <br />
      <JumboRaisedButton
        label="Add"
        backgroundColor={colors.green}
        labelColor="#fff"
        onTouchTap={async () => {

          if (!firstname) {
            toastr.error('First name required');
            return;
          }

          try {

            console.log("called add appointment")

            const payload = await AppointmentsAPI.create(
              firstname,
              lastname,
              phoneNumber,
              date,
              companyId,
              providerName,
            );


            console.log(payload)
            if (payload.error) {

              toastr.error('Server error try again')
              return
            }

            const appointment = {
              firstName: firstname,
              lastName: lastname,
              phoneNumber: phoneNumber,
              providerName: providerName,
              date: moment(date).format('MMM Do YYYY'),
              time: moment(date).format('h:mm:ss a')
            }

            hideOverlay(appointment)

          } catch (e) {
            console.log(e)
            toastr.error('Server error try again');
          }

        }}
      />
    </Card>
  );
}

export default AddAppointmentOverlay
