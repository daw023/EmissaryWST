/**
 * @author Anthony Altieri on 6/10/17.
 */

export const emailError = (error) => ({
  type: 'CREDENTIALS_EMAIL_ERROR',
  error
});

export const firstnameError = (error) => ({
  type: 'CREDENTIALS_FIRSTNAME_ERROR',
  error
});

export const lastnameError = (error) => ({
  type: 'CREDENTIALS_LASTNAME_ERROR',
  error
});

export const companyError = (error) => ({
  type: 'CREDENTIALS_COMPANY_ERROR',
  error
});

export const passwordError = (error) => ({
  type: 'CREDENTIALS_PASSWORD_ERROR',
  error
});

export const phoneNumberError = error => ({
  type: 'CREDENTIALS_PHONENUMBER_ERROR',
  error,
});

export const emailOk = () => ({ type: 'CREDENTIALS_EMAIL_OK' });
export const firstnameOk = () => ({ type: 'CREDENTIALS_FIRSTNAME_OK' });
export const lastnameOk = () => ({ type: 'CREDENTIALS_LASTNAME_OK' });
export const companyOk = () => ({ type: 'CREDENTIALS_COMPANY_OK' });
export const passwordOk = () => ({ type: 'CREDENTIALS_PASSWORD_OK' });
export const phoneNumberOk = () => ({ type: 'CREDENTIALS_PHONENUMBER_OK' });
