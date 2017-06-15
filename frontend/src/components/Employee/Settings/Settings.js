/**
 * @flow
 * @author Vinh Doan on 6/14/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import Paper from 'material-ui/Paper';
import Input from '../../Input/TextInputBox';
import Form from './Form';
import Card from '../../Overlay/Card';
import * as CredentialsActions from '../../../actions/Credentials';
import * as CompanyActions from '../../../actions/Company';


class Settings extends Component {
  render() {
    return (
      <div className="stage">
        <SectionHeader text="Settings"/>
        <div
          className="settingsForms">
          <p className="changeSettingsLabel">
            Change Account Settings:
          </p>
          <Form
            {...this.props}
          />
        </div>
      </div>
    );
  }
}


const stateToProps = (state) => ({
  isEmailError: !!state.credentials.emailError,
  emailError: state.credentials.emailError,
  isPasswordError: !!state.credentials.passwordError,
  passwordError: state.credentials.passwordError,
  isCompanyError: !!state.credentials.companyError,
  companyError: state.credentials.companyError,
  isFirstnameError: !!state.credentials.firstnameError,
  firstnameError: state.credentials.firstnameError,
  isLastnameError: !!state.credentials.lastnameError,
  lastnameError: state.credentials.lastnameError,
  isPhoneNumberError: !!state.credentials.phoneNumberError,
  phoneNumberError: state.credentials.phoneNumberError,
  companyId: state.company.id,
  companyName: state.company.name,
  companyEmail: state.company.email,
  companyPhone: state.company.phoneNumber,

});
const dispatchToProps = (d) => ({
  displayEmailError: error => d(CredentialsActions.emailError(error)),
  displayFirstnameError : error => d(CredentialsActions.firstnameError(error)),
  displayLastnameError: error => d(CredentialsActions.lastnameError(error)),
  displayPhoneNumberError: error => d(CredentialsActions.phoneNumberError(error)),
  displayPasswordError: error => d(CredentialsActions.passwordError(error)),
  displayCompanyError: error => d(CredentialsActions.companyError(error)),
  emailOk: () => d(CredentialsActions.emailOk()),
  companyOk: () => d(CredentialsActions.companyOk()),
  passwordOk: () => d(CredentialsActions.passwordOk()),
  firstnameOk: () => d(CredentialsActions.firstnameOk()),
  lastnameOk: () => d(CredentialsActions.lastnameOk()),
  phoneNumberOk: () => d(CredentialsActions.phoneNumberOk()),
  setCompany: (id, name, email, phoneNumber, paidTime) => d(
    CompanyActions.set(id, name, email, phoneNumber, paidTime)
  ),
});

Settings = connect(stateToProps, dispatchToProps)(Settings);
export default Settings;
