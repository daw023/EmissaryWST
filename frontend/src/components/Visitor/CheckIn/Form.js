import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from '../../Input/TextInputBox';


class Form extends Component {
  render() {
    return (
      <div className="formContainer">
        <Paper className="formCard">
          <Input
            type="name"
            placeholder="First name"
            containerClassName="inputContainer"
          />
        </Paper>
      </div>
    );
  }
}

export default Form