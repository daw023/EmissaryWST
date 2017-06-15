/**
 * @author Anthony Altieri on 6/10/17.
 */

import { post, get, del } from './http';

/**
* Create a visitor to a company when the visitor checks into the system
* that includes visitor information: company id, first nae, last name, phone number, check in time,
* and additional information.
*/
export const create = async (
  companyId,
  firstName,
  lastName,
  phoneNumber,
  checkinTime,
  additionalInfo,
) => await post(
  '/visitors',
  {
    company_id: companyId,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    checkin_time: checkinTime,
    additional_info: additionalInfo,
  }
);

/**
* Gets the company's visitor list by company id
* @param companyId - a company's id
*/
export const getAllByCompanyId = async (companyId) => await get(
  `/visitors/company/${companyId}`, { company_id: companyId }
);

/**
* Deletes a visitor from a company's visitor list
* @param companyId - a company's id
* @param visitorId - visitor's id
*/
export const del = async (companyId, visitorId) => await del(
  `company/${companyId}/visitor/${visitorId}`
);

/**
* Clears the entire visitor list
* @param visitorListId - a company's visitor list id
*/
export const delByVisitorListId = async (visitorListId) => await del(
  `/visitors/${visitorListId}`
);

