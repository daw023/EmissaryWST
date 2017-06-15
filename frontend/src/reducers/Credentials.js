/**
 * @author Anthony Altieri on 6/10/17.
 */

const initialState = {
  emailError: null,
  firstnameError: null,
  lastnameError: null,
  companyError: null,
  phoneNumberError: null,
};

/**
* Based on action, will determine whether there has been an error in email, first name
* last name, company, or phone number
*/
const Credentials = (state = initialState, action) => {
  switch (action.type) {

    case 'CREDENTIALS_EMAIL_ERROR':
      return { ...state, emailError: action.error, };

    case 'CREDENTIALS_COMPANY_ERROR':
      return { ...state, companyError: action.error, };

    case 'CREDENTIALS_FIRSTNAME_ERROR':
      return { ...state, firstnameError: action.error, };

    case 'CREDENTIALS_LASTNAME_ERROR':
      return { ...state, lastnameError: action.error, };

    case 'CREDENTIALS_PASSWORD_ERROR':
      return { ...state, passwordError: action.error, };

    case 'CREDENTIALS_PHONENUMBER_ERROR':
      return { ...state, phoneNumberError: action.error };

    case 'CREDENTIALS_EMAIL_OK':
      return { ...state, emailError: null };

    case 'CREDENTIALS_FIRSTNAME_OK':
      return { ...state, firstnameError: null };

    case 'CREDENTIALS_LASTNAME_OK':
      return { ...state, lastnameError: null };

    case 'CREDENTIALS_PASSWORD_OK':
      return { ...state, passwordError: null };

    case 'CREDENTIALS_COMPANY_OK':
      return { ...state, companyError: null };

    case 'CREDENTIALS_PHONENUMBER_OK':
      return { ...state, phoneNumberError: null };

    default:
      return state;
  }
};

export default Credentials;

