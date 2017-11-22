'use strict';

import React from 'react';

import HashtagItem from './HashtagItem';

export default class HashtagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hashtagItem = this.props.hashtagList.map((item, idx) => {
      return (
        <HashtagItem key={idx} name={item} onClick={this.props.onClick} removeIcon={this.props.removeIcon || false} />
      );
    });
    let offsetItem = this.props.offset
      ? <div className="col-xs-2 evaluation-write-left"></div>
      : "";
    return (
      <div>
        {offsetItem}
        <div className={this.props.offset ? "col-xs-9" : ""} style={this.props.style || {}}>
          {hashtagItem}
        </div>
      </div>
    );
  }
};
