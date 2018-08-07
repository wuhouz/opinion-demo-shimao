import './src/scss/index.css';
import '../../fonts/monochrome/index.css';
import '../../fonts/multicolor/';

import React, { Component } from 'react';

export default class IcIcon extends Component {
  constructor(props) {
    super(props);

    this.isColor = this.props.type.indexOf('color-') === 0;
    this.baseClassName = this.isColor ? 'ic-icon-color ' : 'ic-icon ';
  }

  render() {
    let props = this.props;

    let {
      type,
      className,
      size,
      style = {},

      ...other
    } = props;

    className = `${this.baseClassName} icon-${type} ${className}`;

    style.fontSize = size ? size : style.fontSize;

    return this.isColor ? (
      <svg
        {...other}
        className={className}
        style={style}
      ><use xlinkHref={'#icon-' + type}></use></svg>
    ) : (
      <i
        {...other}
        className={className}
        style={style}
      ></i>
    )
  }
};

IcIcon.defaultProps = {
  className: '',
  type: ''
};
