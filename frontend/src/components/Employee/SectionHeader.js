/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const sectionHeaderId = 'sectionHeader';
const SHOWING_CLASS = 'showing';

class SectionHeader extends Component {
  componentDidMount() {
    const QUARTER_SECOND = 250;
    window.setTimeout(() => {
      const node = document.getElementById(sectionHeaderId);
      node.classList.add(SHOWING_CLASS);
    }, QUARTER_SECOND)
  }
  render() {
    const { text } = this.props;
    return (
      <Paper id={sectionHeaderId} zDepth={2} className="sectionHeader">
        <h2 className="text">{text}</h2>
      </Paper>
    )
  }
}

export default SectionHeader;
 