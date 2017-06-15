/**
 * @author Anthony Altieri on 6/10/17.
 */

import { get, post, put, del } from './http';

/**
* Creates a company that is used in the sign up process to sign up a user that takes their
* company's email, name and phone number
*/
export const create = async (email, name, phoneNumber) => await post(
  `/companies`,
  {
    phone_number: phoneNumber,
    email,
    name,
  }
);

/**
* Gets a company 
* @param companyId - a company's id
*
*/
export const getById = async (companyId) => await get(`/companies/${companyId}`);

/**
* Gets all companies in the database 
*/
export const getAll = async () => await get(`/companies`);

/**
* Deletes a company 
* @param companyId - a company's id
*/
export const deleteByCompanyId = async (companyId) => await del(`/companies/${companyId}`);

/**
* Updates a company's information
* @param companyId - a company's id
* @param fields - updateable company information such as email, name and phone number
*/
export const update = async (companyId, fields) => {
  const fieldKeys = Object.keys(fields);
  const findValueInField = (...possibleKeys) => {
    for (let i = 0 ; i < possibleKeys.length ; i++) {
      const key = possibleKeys[i];
      if (fieldKeys.indexOf(key) >= 0) return fields[key];
    }
  };
  const data = {
    email: findValueInField('email'),
    name: findValueInField('name'),
    phone_number: findValueInField('phone_number', 'phoneNumber'),
  };
  console.log("DATA", data)
  return await put(`/companies/${companyId}`, data);
};

/**
* Resets a user's crendentials
* @param email - a user's email
*/
export const resetCredentials = async (email) => await put(
  `/companies/setting/${email}`
);
