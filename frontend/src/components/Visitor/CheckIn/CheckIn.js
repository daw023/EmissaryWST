import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as VisitorActions from '../../../actions/Visitor';
import Granim from 'granim'
import Resting from './Resting';
import FillInformation from './FillInformation';

class CheckIn extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.leaveCheckIn();
  }


  render() {
    const {
      goToWelcome,
      clickCheckIn,
      clickBack,
      isFillingOutInformation,
      companyName,
    } = this.props;

    return (
      <div className="checkIn noOverflow">
        <canvas
          id="granim-canvas"
          ref={(node) => {
            const granimInstance = new Granim({
              element: '#granim-canvas',
              name: 'background',
              opacity: [1, 1],
              states: {
                'default-state': {
                  gradients: [
                   ['#1CD8D2', '#93EDC7']
                  ]
                }
              }
            })
          }}
        >
        </canvas>
        <div className="content">
          {isFillingOutInformation
            ? <FillInformation clickBack={clickBack} />
          : <Resting goToWelcome={goToWelcome} clickCheckIn={clickCheckIn} companyName={companyName}/>
          }
        </div>
      </div>
    );
  }
}

const stateToProps = (s) => ({
  isFillingOutInformation: s.visitor.isFillingOutInformation,
  companyName: s.company.name,
});
const dispatchToProps = (d) => ({
  goToWelcome: () => d(push('/welcome')),
  leaveCheckIn: () => d(VisitorActions.leaveCheckIn()),
  clickCheckIn: () => d(VisitorActions.clickCheckIn()),
  clickBack: () => d(VisitorActions.clickBack()),

});

CheckIn = connect(stateToProps, dispatchToProps)(CheckIn);

export default CheckIn
