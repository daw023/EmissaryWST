/**
 * @author Anthony Altieri on 6/10/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Overlay/Card';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import * as OverlayActions from '../../actions/Overlay';
import * as CredentialsActions from '../../actions/Credentials';
import * as EmployeesApi from '../../api/Employees';
import FlatButton from '../Buttons/FlatButton';
import RaisedButton from '../Buttons/RaisedButton';
import JumboRaisedButton from '../Buttons/JumboRaisedButton';
import OrLine from '../Dividers/OrLine';
import Line from '../Dividers/Line';
import TextInputBox from '../Input/TextInputBox';
import colors from '../../colors';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';


class LoginOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRememberEmail: false,
      rememberedEmail: null,
    }
  }

  componentDidMount() {
    const rememberEmail = document.getElementById('rememberEmail');
    const rememberedEmail = window.localStorage.getItem('email');
    if (rememberEmail === null) return;
    console.log('rememberedEmail', rememberedEmail);
    if (rememberedEmail === null) {
      rememberEmail.checked = false;
    } else {
      rememberEmail.checked = true;
      this.state.rememberedEmail = rememberedEmail;
    }
    this.forceUpdate();
  }

  render() {
    const {
      isVisible,
      hideOverlay,
      showOverlay,
      emailOk,
      displayEmailError,
      passwordOk,
      displayPasswordError,
      login,
    } = this.props;
    const {
      rememberedEmail,
    } = this.state;

    let email = '';
    let password = '';

    console.log('in render() rememberedEmail', this.state.rememberedEmail);

    let defaultEmailValue = '';
    if (rememberedEmail && rememberedEmail !== 'null') {
      defaultEmailValue = rememberedEmail;
    }



    return (
      <Card isVisible={isVisible} hideOverlay={hideOverlay}>
        <TextInputBox
          type="email"
          placeholder="Email Address"
          defaultValue={defaultEmailValue}
          inputRef={(n) => {
            if (!n) return;
            email = n.value
          }}
          onChange={(e) => {
            email = e.target.value;
          }}
          style={{ marginTop: 18 }}
        />
        <TextInputBox
          type="password"
          placeholder="Password"
          containerStyle={{ marginTop: 16, marginBottom: 16 }}
          inputRef={(n) => {
            if (!n) return;
            password = n.value
          }}
          onChange={(e) => {
            password = e.target.value;
          }}
        />
        <div
          className="r between"
          style={{ marginBottom: 16 }}
        >
          <Checkbox
            label="Remember Email"
            style={{ width: 200 }}
            labelStyle={{ width: 'auto' }}
            iconStyle={{ fill: colors.secondary }}
            defaultChecked={this.state.rememberedEmail != null}
            id="rememberEmail"
          />
          {/*<FlatButton*/}
            {/*label="Forgot Password"*/}
            {/*labelStyle={{ color: colors.secondary }}*/}
          {/*/>*/}
        </div>
        <JumboRaisedButton
          label="Log in"
          backgroundColor={colors.bright}
          labelColor={'#FFFFFF'}
          onTouchTap={async () => {
            try {
              const payload = await EmployeesApi.login(
                email,
                password
              );
              if (payload.error) {
                toastr.error('Payload error', 'Please try again later');
                return;
              }
            } catch (e) {
              toastr.error('Server error', 'Please try again later');
              return;
            }
            toastr.success('Login successful!');
            this.props.navigate('/welcome')
          }}
        />
        <Line />
        <div className="r between">
          <p>No Account?</p>
          <RaisedButton
            label="Sign up"
            onTouchTap={() => showOverlay('SIGN_UP')}
            secondary
          />
        </div>
      </Card>

    )
  }
}

const stateToProps = (s) => ({
  isEmailError: s.credentials.emailError,
  emailError: s.credentials.emailError,
  isPasswordError: s.credentials.passwordError,
  passwordError: s.credentials.passwordError,
});
const dispatchToProps = d => ({
  hideOverlay: () => d(OverlayActions.hideOverlay()),
  showOverlay: (mode) => d(OverlayActions.showOverlay(mode)),
  emailOk: () => d(CredentialsActions.emailOk()),
  displayEmailError: error => d(CredentialsActions.emailError(error)),
  displayPasswordError: error => d(CredentialsActions.passwordError(error)),
  passwordOk: () => d(CredentialsActions.passwordOk()),
  navigate: (url) => d(push(url))
});


LoginOverlay = connect(stateToProps, dispatchToProps)(LoginOverlay);

export default LoginOverlay;