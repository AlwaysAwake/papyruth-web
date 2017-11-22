'use strict';

import React from 'react';
import ViewConstants from '../../constants/ViewConstants';
var removeIcon = ViewConstants.Evaluation.hashtagItem.removeIcon;

export default class HashtagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  _onMouseOver() {
    this.setState({ hover: true });
  }

  _onMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    let removeIconEl = '';
    if (this.props.removeIcon) {
      if (this.state.hover) {
        removeIconEl = <img className="hashtag-remove-icon" src={removeIcon.hoverImgPath} />;
      } else {
        removeIconEl = <img className="hashtag-remove-icon" src={removeIcon.imgPath} />;
      }
    }
    return (
      <div style={{ marginTop: '5px', marginRight: '5px', float: 'left' }}>
        <a onClick={this.props.onClick.bind(null, this.props.name)} onMouseOver={this._onMouseOver.bind(this)} onMouseOut={this._onMouseOut.bind(this)} href="#" >
          <span className="label label-default hashtag-item noto">
            {'#' + this.props.name}
            {removeIconEl}
          </span>
        </a>
      </div>
    );
  }
};
