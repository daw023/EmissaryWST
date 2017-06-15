import React, { Component } from 'react';
import MaterialFab from 'material-ui/FloatingActionButton';

const Tooltip = ({ text, isShowing }) => isShowing
  ? (
    <div
      style={{
        padding: '4px 8px',
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 8,
        left: -80 + (text.length * -4),
      }}
    >
      <p
        style={{
          color: '#fff',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
  : null;

class OptionMiniFab extends Component {
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
    const {
      style,
      isMobile,
      tooltipText,
      ...props,
    } = this.props;
    return (
      <div
        {...props}
        style={{
          ...style,
        }}
      >
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
          <Tooltip text={tooltipText} isShowing={this.state.isHovered || isMobile} />
          <MaterialFab
            mini
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}
          >
            <p
              style={{
              color: '#fff',
              margin: 0,
            }}
            >
              {tooltipText[0]}
            </p>
          </MaterialFab>

        </div>
      </div>
    );
  }
}

export default OptionMiniFab