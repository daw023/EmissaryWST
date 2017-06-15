/**
 * @author Anthony Altieri on 6/4/17.
 */

import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import colors from '../../colors';
import styles from './style.mcss';
import flex from '../style/flex.mcss';

class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
      text: props.defaultValue || '',
    }
  }

  onFocus(e) {
    this.state.isFocussed = true;
    this.forceUpdate();
  }
  onBlur(e) {
    this.state.isFocussed = false;
    this.forceUpdate();
  }


  render() {
    const {
      type,
      placeholder,
      defaultValue,
      containerStyle,
      isError,
      errorMessage,
      onChange,
      inputRef,
      style,
      containerClassName,
      readonly,
    } = this.props;
    const {
      isFocussed
    } = this.state;

    let inputType = type;
    let icon = null;
    switch (type) {
      case 'email':
        icon = <FontIcon className={`fa fa-envelope-o ${styles.icon}`}/>;
        break;

      case 'password':
        icon = (
          <FontIcon className={`material-icons ${styles.icon}`}>
            lock_outline
          </FontIcon>
        );
        break;

      case 'phone':
        icon = (
          <FontIcon className={`material-icons ${styles.icon}`}>
            phone
          </FontIcon>
        );
        inputType = 'text';
        break;

      case 'business':
        icon = (
          <FontIcon className={`material-icons ${styles.icon}`}>
            work
          </FontIcon>
        );
        inputType = 'text';
        break;

      case 'name':
      case 'account':
        icon = <FontIcon className={`fa fa-user-o ${styles.icon}`} />;
        inputType = 'text';
        break;
    }

    let outsideContainerNode;


    return (
      <div
        className={`c left ${!!containerClassName ? containerClassName : ''}`}
        style={containerStyle}

      >
        <div
          className={`${styles.outsideContainer} ${!!isError ? styles.error : ''}`}
          ref={(n) => { outsideContainerNode = n }}
          style={{
            ...style,
            boxShadow: isFocussed ? `0 0 10px ${colors.secondary}` : 'none',
          }}
        >
          {icon}
          <div className={`${styles.inputContainer} ${!!icon ? '' : 'noIcon'}`}>
            <input
              readOnly={!!readonly}
              onChange={(e) => {
                this.state.text = e.target.value;
                onChange(e)
              }}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              ref={(n) => {
                if (!n) return;
                n.value = this.state.text;
                if (!!inputRef) {
                  inputRef(n)
                }
            }}
              type={inputType}
              placeholder={placeholder}
              className={styles.input}
            />
          </div>
        </div>
        {!!isError && !!errorMessage
          ? <p className={styles.errorMessage}>{errorMessage}</p>
          : null
        }
      </div>
    )
  }

}

export default TextInputBox;
