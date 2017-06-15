/**
 * @flow
 * @author Anthony Altieri on 6/10/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './Footer';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="imageWrapper">
          <img src={require('../../img/waiting-room.jpg')} />
        </div>
        <div className="content">
          <div className="brandContainer">
            <div className="brandWrapper">
              <img src={require('../../img/logo-emissary.png')} />
              <h1 className="brand">Emissary</h1>
            </div>
          </div>
          <Footer />
        </div>
      </div>

    );
  }
}

const stateToProps = (s) => ({});

const dispatchToProps = (d) => ({});

Landing = connect(stateToProps, dispatchToProps)(Landing);
export default Landing;
 