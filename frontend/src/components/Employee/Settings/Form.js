import React from 'react';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import TextInputBox from '../../Input/TextInputBox';
import colors from '../../../colors';
import FontIcon from 'material-ui/FontIcon';
import { testEmail } from '../../../utils/Regex';
import { validatePhoneNumber } from '../../../utils/Validation';
import * as CompaniesApi from '../../../api/Companies';
import { toastr } from 'react-redux-toastr';

const Form = ({
  isVisible,
  hideOverlay,
  showOverlay,
  isEmailError,
  emailError,
  displayEmailError,
  emailOk,
  isPhoneNumberError,
  phoneNumberError,
  displayPhoneNumberError,
  phoneNumberOk,
  isCompanyError,
  companyError,
  displayCompanyError,
  companyOk,
  setCompany,
  companyName,
  companyEmail,
  companyPhone,
  companyId,
}) => {
  let email = companyEmail;
  let company = companyName;
  let phoneNumber = companyPhone;

  return (
    <div className="fullwidth">
      <TextInputBox
        type="email"
        placeholder="Email Address"
        defaultValue={email}
        containerStyle={{ marginBottom: 8 }}
        isError={isEmailError}
        errorMessage={emailError}
        inputRef={(n) => {
          if (!n) return;
          email = n.value
        }}
        onChange={(e) => {
          email = e.target.value;
        }}
      />
      <TextInputBox
        type="business"
        placeholder="Company"
        defaultValue={company}
        containerStyle={{ marginBottom: 8 }}
        inputRef={(n) => {
          if (!n) return;
          company = n.value
        }}
        onChange={(e) => {
          company = e.target.value;
        }}
        isError={isCompanyError}
        errorMessage={companyError}
      />
      <TextInputBox
        type="phone"
        placeholder="Phone number"
        defaultValue={phoneNumber}
        containerStyle={{ marginBottom: 16 }}
        inputRef={(n) => {
          if (!n) return;
          phoneNumber = n.value
        }}
        onChange={(e) => {
          phoneNumber = e.target.value;
        }}
        isError={isPhoneNumberError}
        errorMessage={phoneNumberError}
      />
      <JumboRaisedButton
        fullWidth
        label="Save Settings"
        backgroundColor={colors.bright}
        labelColor={'#FFFFFF'}
        icon={<FontIcon className="fa fa-envelope-o icon"/>}
        onTouchTap={async () => {
          let hasError = false;
          if (!testEmail(email)) {
            hasError = true;
            displayEmailError('Email invalid');
          }
          if (!validatePhoneNumber(phoneNumber)) {
            hasError = true;
            displayPhoneNumberError('Phone number required');
          }
          if (!company || company.trim().length === 0) {
            hasError = true;
            displayCompanyError('Company required');
          }
          if (hasError) return;


          try {
            const payload = await CompaniesApi.update(companyId, {
              email: email,
              name: company,
              phone_number: phoneNumber,
            });

            if (payload.error) {
              toastr.error(
                'Error saving account',
                'Company account having trouble saving'
              );
              return;
            }
            toastr.success('Business Account saved successfully');
            console.log("PAYLOAD", payload)
            setCompany(
              payload['_id'],
              payload['name'],
              payload['email'],
              payload['phone_number'],
              payload['paid_time'],
            );
            emailOk();
            companyOk();
            phoneNumberOk();
          } catch (e) {
            console.error('Company create error', e);
            toastr.error('Server error', 'Please try again later');
          }

        }}
      />
    </div>
  )
  ;
}

export default Form
