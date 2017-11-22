'use strict';

import React from 'react';

export default class TagsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick(e) {
    e.preventDefault();
  }

  render() {
    let tagItem = this.props.hashtags?
      this.props.hashtags.map((tag, idx) => {
        return (
          <div key={idx} style={{marginTop: '5px', float: 'left', marginRight: '5px'}}>
            <a href="#" onClick={this._onClick} >
              <span className="label label-default noto" style={{fontWeight: "normal", backgroundColor: "#adadad"}}>
                # {tag}
              </span>
            </a>
          </div>
        );
      }) : "";

    return (
      <div className="row">
        <div className="col-xs-12" style={{top: '-8px'}}>
          <div style={{marginTop: '5px', float: 'left', marginRight: '5px'}}>
            <span className="noto" style={{fontWeight: "normal", color: "rgb(39, 181, 175)"}}>
              #태그
            </span>
          </div>
          {tagItem}
        </div>
      </div>
    );
  }
};
