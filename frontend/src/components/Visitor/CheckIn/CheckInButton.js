/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

class CheckInButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    }
  }
  onMouseEnter() {
    this.state.isHovered = true;
    this.forceUpdate();
  }
  onMouseLeave() {
    this.state.isHovered = false;
    this.forceUpdate();
  }
  render() {
    const { onClick} = this.props;
    const { isHovered } = this.state;
    return (
      <Paper
        zDepth={isHovered ? 3 : 1}
        onTouchTap={() => onClick()}
        className="checkInButton c center"
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <FontIcon className="icon material-icons">mode_edit</FontIcon>
        <p>Check In</p>
      </Paper>
    );
  }
}

export default CheckInButton;
 