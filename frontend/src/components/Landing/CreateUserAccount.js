import React, {Component} from 'react';
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
import * as EmployeesApi from '../../api/Employees';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class CreateUserAccount extends Component {
  render() {
    const {
      isVisible,
      hideOverlay,
      showOverlay,
      isEmailError,
      emailError,
      displayEmailError,
      emailOk,
      isPasswordError,
      passwordError,
      displayPasswordError,
      passwordOk,
      isFirstnameError,
      firstnameError,
      displayFirstnameError,
      firstnameOk,
      isLastnameError,
      lastnameError,
      displayLastnameError,
      lastnameOk,
      previousStep,
      displayPhoneNumberError,
      phoneNumberOk,
      isPhoneNumberError,
      phoneNumberError,
      isCompanyError,
      companyError,
      displayCompanyError,
      companyOk,
      companyId,
      companyName,
    } = this.props;

    let email = '';
    let firstname = '';
    let lastname = '';
    let phoneNumber = '';
    let password = '';
    let company = '';

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
          type="account"
          placeholder="First name"
          containerStyle={{ marginBottom: 8 }}
          inputRef={(n) => {
            if (!n) return;
            firstname = n.value
          }}
          onChange={(e) => {
            firstname = e.target.value;
          }}
          isError={isFirstnameError}
          errorMessage={firstnameError}
        />
        <TextInputBox
          type="account"
          placeholder="Last name"
          containerStyle={{ marginBottom: 8 }}
          inputRef={(n) => {
            if (!n) return;
            lastname = n.value
          }}
          onChange={(e) => {
            lastname = e.target.value;
          }}
          isError={isLastnameError}
          errorMessage={lastnameError}
        />
        <TextInputBox
          type="business"
          placeholder="Company"
          containerStyle={{ marginBottom: 8 }}
          readOnly={!!companyName}
          defaultValue={companyName || ''}
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
        <TextInputBox
          type="password"
          placeholder="Password"
          containerStyle={{ marginBottom: 16 }}
          inputRef={(n) => {
            if (!n) return;
            password = n.value
          }}
          onChange={(e) => {
            password = e.target.value;
          }}
          isError={isPasswordError}
          errorMessage={passwordError}
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
              displayPhoneNumberError('Phone number invalid');
            }
            if (!company || company.trim().length === 0) {
              hasError = true;
              displayCompanyError('Company required');
            }
            if (!firstname || firstname.trim().length === 0) {
              hasError = true;
              displayFirstnameError('First name required');
            }
            if (!lastname || lastname.trim().length === 0) {
              hasError = true;
              displayLastnameError('Last name required');
            }


            if (hasError) return;

            try {
              const payload = await EmployeesApi.create(
                firstname,
                lastname,
                password,
                email,
                phoneNumber,
                companyId,
                company,
                !!companyId ? 'Owner' : 'Undeclared',
              );
              if (payload.error) {
                toastr.error('Payload error', payload.error);
                return;
              }

              const payload2 = await EmployeesApi.login(
                email,
                password
              );
              if (payload2.error) {
                toastr.error('Payload error', 'Please try again later');
                return;
              }

            } catch (e) {
              toastr.error('Server error');
              return;
            }

            toastr.success('User Account created successfully');
            this.props.navigate('/welcome')
          }}
        />
        <Line />
        <div className="r between wrap">
          <p>Don't have a Business Account?</p>
          <RaisedButton
            onTouchTap={() => previousStep()}
            label="Previous step"
            secondary
          />
        </div>
        <OrLine />
      </div>
    );
  }
}

const stateToProps = (s) => ({});
const dispatchToProps = (d) => ({
  navigate: (url) => d(push(url))
});

CreateUserAccount = connect(stateToProps, dispatchToProps)(CreateUserAccount);

export default CreateUserAccount