/**
 * @author Anthony Altieri on 6/10/17.
 */

export const setId = id => ({ type: 'COMPANY_SET_ID', id });
export const set = (id, name, email, phoneNumber, paidTime) => ({
  type: 'COMPANY_SET',
  id,
  name,
  email,
  phoneNumber,
  paidTime,
})
export const clearInfo = () => ({ type: 'COMPANY_CLEAR' });
