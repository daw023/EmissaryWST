import React from 'react';
import OrLine from '../Dividers/OrLine';
import FlatButton from '../Buttons/FlatButton';
import RaisedButton from '../Buttons/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import JumboRaisedButton from '../Buttons/JumboRaisedButton';
import Line from '../Dividers/Line';
import TextInputBox from '../Input/TextInputBox';
import colors from '../../colors';
import { testEmail } from '../../utils/Regex';
import { validatePhoneNumber } from '../../utils/Validation';
import * as CompaniesApi from '../../api/Companies';
import { toastr } from 'react-redux-toastr';

const CreateBusinessAccount = ({
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
  nextStep,
}) => {
  let email = '';
  let company = '';
  let phoneNumber = '';

  return (
    <div className="fullwidth">
      <TextInputBox
        type="email"
        placeholder="Email Address"
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
        label="Sign up"
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
            const payload = await CompaniesApi.create(email, company, phoneNumber);

            if (payload.error) {
              toastr.error(
                'Error creating account',
                'Company account might have already been created'
              );
              return;
            }
            toastr.success('Business Account created successfully');
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
            nextStep();
          } catch (e) {
            console.error('Company create error', e);
            toastr.error('Server error', 'Please try again later');
          }
        }}
      />
      <Line />
      <div className="r between wrap">
        <p>Already have a Business Account?</p>
        <RaisedButton
          onTouchTap={() => nextStep()}
          label="Next step"
          secondary
        />
      </div>
      <OrLine />
    </div>
  )
  ;
}

export default CreateBusinessAccount