/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';

class Forms extends Component {
  render() {
    return (
      <div className="stage">
        <SectionHeader text="Forms"/>
      </div>
    );
  }
}

const stateToProps = (s) => ({});

const dispatchToProps = (d) => ({});

Forms = connect(stateToProps, dispatchToProps)(Forms);
export default Forms;
 