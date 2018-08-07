import './index.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Icon from '../index';

class IconExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ic-icon-example">
        <span>
          单色：<Icon type="search_normal" />
        </span>

        <span style={{
          marginLeft: 20
        }}>
          测试文字
          <Icon type="-1-01" />
        </span>

        <span style={{
          marginLeft:20
        }}>
          彩色：
          <Icon type="color-stars_full"
            style={{
              fontSize:60,
              position: 'relative',
              top:16
            }}
          />
        </span>

        <p>
          使用说明请参照 README.md
        </p>
      </div>
    );
  }
}

render(
  <IconExample />,
  document.getElementById('j-react-root')
)
