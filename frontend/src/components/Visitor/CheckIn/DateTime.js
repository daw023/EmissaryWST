/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */
import moment from 'moment';

import React, {Component} from 'react';

class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      interval: null,
    }
  }


  componentDidMount() {
    const ONE_SECOND = 1000;
    this.state.interval = window.setInterval(() => {
      this.state.time = new Date();
      this.forceUpdate();
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    if (this.state.interval !== null) {
      window.clearInterval(this.state.interval)
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div className="glass timeContainer">
        <p className="datetime">{moment(time).format('DD/MM/YYYY')}</p>
        <p className="datetime">{moment(time).format('h:mm:ss a')}</p>
      </div>
    );
  }
}

export default DateTime;
 