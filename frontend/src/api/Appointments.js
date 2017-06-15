/**
 * @author Anthony Altieri on 6/10/17.
 */

import { get, put, post, del } from './http';
import moment from 'moment';

/**
* Creates a new appointment for a visitor that contains their first name, last name
* phone number, date, companyId, and provider name
*/
export const create = async (
  firstName,
  lastName,
  phoneNumber,
  date,
  companyId,
  providerName
) => await post(
  `/appointments/`,
  {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    company_id: companyId,
    provider_name: providerName,
    date,
  }
);

/**
* Gets an appointment of a company
* @param appointmentId - the id of the appointment to a company
*/
export const getById = async (appointmentId) => await get(
  `/appointments/${appointmentId}`
);

/**
* Gets all of the company's scheduled appointments
* @param companyId - a company's id
*/
export const getAllByCompanyId = async (companyId) => {
  console.log(companyId)
  const payload = await get(`/appointments/company/${companyId}`);
  if (payload.error)
    return payload

  const appointments = []

  payload.map((a) => {

    let appointment = {
      firstName: a.first_name,
      lastName: a.last_name,
      phoneNumber: a.phone_number,
      date: moment(a.date).format('MMM Do YYYY'),
      time: moment(a.date).format('h:mm:ss a')
    }
    appointments.push(appointment)
  })

  console.log("what the actual fuck")
  console.log(appointments)

  return appointments
}

/**
* Deletes a visitor's appointment
* @param appointmentId - the id of the appointment to a company
*/
export const deleteByAppointmentId = async (appointmentId) => await del(
  `/appointments/${appointmentId}`
);

/**
* Updates a visitor's appointment
* @param appointmentId - the id of the appointment to a company
* @param fields - the updateable items of an appointment, the first name, last name, phone number
*			      date, and provider name
*/
export const update = async (appointmentId, fields) => {
  // Get the keys in fields (the fields that should be updated)
  const fieldKeys = Object.keys(fields);
  // Helper function to find the value of a key if it exists
  const findVlaueInFields = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.find(key)[0]) return fields[key];
    }
  };
  const data = {
    first_name: findVlaueInFields('first_name', 'firstName'),
    last_name: findVlaueInFields('last_name', 'lastName'),
    phone_number: findVlaueInFields('phone_number', 'phoneNumber'),
    date: findVlaueInFields('date'),
    provider_name: findVlaueInFields('provider_name', 'providerName')
  };
  return await put(`/appointments/${appointmentId}`, data)
};

