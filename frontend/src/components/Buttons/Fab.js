import React, { Component } from 'react';
import MaterialFab from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import OptionsMiniFab from './OptionMiniFab';
import throttle from 'lodash/throttle';

const Tooltip = ({ text, isShowing }) => isShowing
  ? (
    <div
      style={{
        padding: '4px 8px',
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        top: 15,
        left: -80,

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

const POSSIBLE_LOCATIONS = {
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
};

const VERTICAL_SPACE = 12;
const HORIZONTAL_SPACE = 18;
const DIMENS = {
  BOTTOM: VERTICAL_SPACE,
  RIGHT: HORIZONTAL_SPACE,
  LEFT: HORIZONTAL_SPACE,
};

class Fab extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowingOptions: false,
      isHovered: false,
      isMobile: false,
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

  /**
   * If there is an onClick() passed in we do that otherwise.
   * If there are options we return a function that will toggle the showing
   * of the options.
   * Note that an onClick() prop will take precedent to options
   * @return {function()}
   */
  determineOnClick() {
    const {
      options,
      onClick,
    } = this.props;
    return onClick
      ? onClick
      : () => {
        if (options && options.length !== 0) {
          this.state.isShowingOptions = !this.state.isShowingOptions;
          this.forceUpdate();
        }
      }
  }

  hideOptions() {
    this.state.isShowingOptions = false;
    this.forceUpdate();
  }

  render() {
    const {
      location,
      options,
      tooltipText,
      isMobile,
      icon = null,
    } = this.props;
    const {
      isShowingOptions,
      isHovered,
    } = this.state;


    const hasOptions = options && options.length > 0;

    let style = {
      position: 'absolute',
    };
    switch (location) {
      case POSSIBLE_LOCATIONS.BOTTOM_RIGHT:
        style = {
          ...style,
          bottom: DIMENS.BOTTOM,
          right: DIMENS.RIGHT,
        };
        break;

      case POSSIBLE_LOCATIONS.BOTTOM_LEFT:
        style = {
          ...style,
          bottom: DIMENS.BOTTOM,
          left: DIMENS.RIGHT,
        };
        break;

      default:
        throw new Error(`Invalid location ${location}`);
    }

    let fabIcon = icon;
    if (hasOptions) {
      if (isShowingOptions) {
        fabIcon = (
          <FontIcon
            className="material-icons"
          >
            arrow_downward
          </FontIcon>
        )
      } else {
        fabIcon = (
          <FontIcon className="material-icons">
            arrow_upward
          </FontIcon>
        )
      }

    }



    let optionButtons = null;
    if (isShowingOptions) {
      let negativeTopOffset = -58;
      let offsetIncrement = -50;
      optionButtons = options.reduce((a, c, i) => {
        return [
          ...a,
          <OptionsMiniFab
            key={`Fab-Option-${i}`}
            isMobile={isMobile}
            tooltipText={c.text}
            onTouchTap={() => {
              c.onClick();
              this.hideOptions.bind(this)();
            }}
            style={{
              position: 'absolute',
              top: negativeTopOffset + (i * offsetIncrement),
              right: 9,
            }}
          />
        ]
    }, [])
    }

    let tooltipContent;
    if (hasOptions) {
      tooltipContent = isShowingOptions ? 'Hide' : 'Actions';
    } else {
      tooltipContent = tooltipText;
    }



    return (
      <div
        style={{
          ...style,
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {optionButtons}
          <Tooltip
            text={tooltipContent}
            isShowing={!isMobile && isHovered}
          />
          <MaterialFab
            onTouchTap={() => this.determineOnClick().bind(this)()}
            secondary
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}
          >
            {fabIcon}
          </MaterialFab>
        </div>
      </div>
    );

  }

}

export default Fab