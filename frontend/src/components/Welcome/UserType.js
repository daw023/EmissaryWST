/**
 * @author Anthony Altieri on 6/4/17.
 */
import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

class UserType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    }
  }

  onMouseEnter(e) {
    this.state.isHovered = true;
    this.forceUpdate();
  }

  onMouseLeave(e) {
    this.state.isHovered = false;
    this.forceUpdate();
  }

  render() {
    const { type, onClick } = this.props;
    const { isHovered } = this.state;

    let materialIconFont;
    let label;
    switch (type) {
      case 'VISITOR':
        materialIconFont = 'person';
        label = 'Visitor';
        break;
      case 'EMPLOYEE':
        materialIconFont = 'work';
        label = 'Employee';
        break;
      default:
        throw new Error('type must be either "Visitor" or "EMPLOYEE"');
    }

    return (
      <Paper
        zDepth={isHovered ? 3 : 1}
        className="userTypeCard"
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onTouchTap={() => onClick()}
      >
        <FontIcon
          className="material-icons"
          style={{
          fontSize: 200,
        }}
        >
          {materialIconFont}
        </FontIcon>
        <p>{label}</p>

      </Paper>
    )
  }
}

export default UserType;

