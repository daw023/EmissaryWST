/**
 * @author Anthony Altieri on 6/10/17.
 */

import { post, get, put, del } from './http';

/**
* Adds an employee to a company  by adding an employee's information: first name, last name, email,
* phone number, password, and role to the company
*/
export const create = async (
  firstName,
  lastName,
  password,
  email,
  phoneNumber,
  companyId,
  companyName,
  role
) => await post(
  '/employees',
  {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    company_id: companyId,
    company_name: companyName,
    password,
    role,
    email,
  }
);

/**
* Retrieves all of the employees that have an account for the company
* @param companyId - a company's id
*/
export const getAllByCompanyId = async (companyId) => await post(
  `/employees/company/${companyId}`,
);

/**
* Gets an employee by their employee id
* @param employeeId - an employee's id
*/
export const getByEmployeeId = async (employeeId) => await post(
  `/employees/${employeeId}`
);

/**
* Deletes an employee by their employee id
* @param employeeId - an employee's id
*/
export const deleteByEmployeeId = async (employeeId) => await post(
  `/employees/${employeeId}`
);

/**
* Updates an employee's information
* @param employeeId - an employee's id
* @param fields - updatable employee's information: first name, last name, email, phone number,
*				  password, and role 
*/
export const update = async (employeeId, fields) => {
  // Get the keys in fields (the fields that should be updated)
  const fieldKeys = Object.keys(fields);
  // Helper function to find the value of a key if it exists
  const findVlaueInFields = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.find(key)[0]) return fields[key];
    }
  };
  // Try to find all of the values that could be updated with this api call
  const data = {
    first_name: findVlaueInFields('first_name', 'firstName'),
    last_name: findVlaueInFields('last_name', 'lastName'),
    email: findVlaueInFields('email'),
    phone_number: findVlaueInFields('phone_number', 'phoneNumber'),
    password: findVlaueInFields('password'),
    role: findVlaueInFields('role')
  };
  return await put(`/employees/${employeeId}`, data)
};

/**
* Logs in an employee
* @param email - an employee's email
* @param password - an employee's password
*/
export const login = async (email, password) => await post(
  `/employees/login`, { email, password }
);






