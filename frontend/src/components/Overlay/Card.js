/**
 * @author Anthony Altieri on 6/4/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from './Overlay';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import iconStyles from '../../iconStyles';

class Card extends Component {
  render() {
    const { isVisible, hideOverlay, children, scrollable } = this.props;
    return (
      <Overlay isVisible={isVisible} onTouchTap={() => hideOverlay()}>
        <div className="r center" style={{ zIndex: 10 }}>
          <Paper
            className="overlayCard"
            style={{
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'flex-start',
              overflow: scrollable ? 'auto' : '',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <IconButton
                onTouchTap={() => hideOverlay()}
                style={{
                  ...iconStyles.small,
                  position: 'absolute',
                  left: -26,
                  top: -48,
                }}
              >
                <FontIcon
                  id="x"
                  className="material-icons"
                >
                  close
                </FontIcon>
              </IconButton>
              {children}
            </div>
          </Paper>
        </div>
      </Overlay>
    );
  }
}
export default Card;
