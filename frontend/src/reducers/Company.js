/**
 * @flow
 * @author Anthony Altieri on 6/10/17.
 */

const initialState = {
  name: null,
  id: null,
  phoneNumber: null,
  email: null,
  paidTime: null,
};

/**
* Based on company action either set a company's id, set a company's information, or 
* clear a company's credentials
*/
const Company = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPANY_SET_ID':
      return { ...state, id: action.id };

    case 'COMPANY_CLEAR': return initialState;

    case 'COMPANY_SET':
      return {
        name: action.name,
        id: action.id,
        phoneNumber: action.phoneNumber,
        email: action.email,
        paidTime: action.paidTime,
      };



    default:
      return state;
  }
}

export default Company
 