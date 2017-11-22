'use strict';

import React from 'react';

export default class AppLink extends React.Component {
  render() {
    return (
      <div className="text-center" style={{marginTop: "15px"}}>
        <a href={this.props.link} target="_blank">
          <img className="applink-img" src={this.props.imgPath} />
        </a>
      </div>
    );
  }
};
