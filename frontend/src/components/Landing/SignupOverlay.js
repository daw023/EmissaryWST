/**
 * @author Anthony Altieri on 6/10/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Overlay/Card';
import RaisedButton from '../Buttons/RaisedButton';
import * as OverlayActions from '../../actions/Overlay';
import * as CredentialsActions from '../../actions/Credentials';
import * as CompanyActions from '../../actions/Company';
import { toastr } from 'react-redux-toastr';
import CreateBusinessAccount from './CreateBusinessAccount';
import CreateUserAccount from './CreateUserAccount';

class SignupWithEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    }
  }


  componentDidMount() {
    const {
      emailOk,
      companyOk,
      passwordOk,
      phoneNumberOk,
    } = this.props;

    emailOk();
    companyOk();
    passwordOk();
    phoneNumberOk();
  }

  nextStep() {
    this.state.step += 1;
    this.forceUpdate();
  }
  previousStep() {
    this.state.step -= 1;
    this.forceUpdate();
  }


  render() {
    const {
      isVisible,
      hideOverlay,
      showOverlay,
    } = this.props;
    const { step } = this.state;

    let email = '';
    let company = '';
    let password = '';

    let stepLabel = 'Create Business Account';
    if (step === 1) {
      stepLabel = 'Create User Account'
    };

    console.log('SignupOverlay', this.props);

    let stepContent = (
      <CreateBusinessAccount
        {...this.props}
        nextStep={this.nextStep.bind(this)}
      />
    );
    if (step === 1) {
      stepContent = (
        <CreateUserAccount
          {...this.props}
          previousStep={this.previousStep.bind(this)}
        />
      )
    }



    return (
      <Card scrollable isVisible={isVisible} hideOverlay={hideOverlay}>
        <p className="signupStepLabel">
          <span className="signupStep">Step {step + 1}/2 :</span>
          {' ' + stepLabel}
        </p>
        {stepContent}
        <div className="r between" style={{marginTop: 12}} >
          <p>Already created an account?</p>
          <RaisedButton
            onTouchTap={() => showOverlay('LOG_IN')}
            label="Log in"
            style={{marginLeft: 12 }}
            secondary
          />
        </div>
      </Card>

    )
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

});
const dispatchToProps = (d) => ({
  hideOverlay: () => d(OverlayActions.hideOverlay()),
  showOverlay: mode => d(OverlayActions.showOverlay(mode)),
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


SignupWithEmail = connect(stateToProps, dispatchToProps)(SignupWithEmail);

export default SignupWithEmail;
