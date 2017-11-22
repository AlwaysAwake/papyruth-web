'use strict';

import React from 'react';

import { Link } from 'react-router';

export default class SidebarItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  _onClick(e) {
    if (this.props.searchFlag) {
      this.props.searchFlag();
      e.preventDefault();
    } else if (this.props.favoriteFlag) {
      this.props.favoriteFlag();
      e.preventDefault();
    }
  }

  _onMouseOver() {
    this.setState({ hover: true });
  }

  _onMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <Link to={this.props.item.url ? this.props.item.url: "/"}
        onMouseOver={this._onMouseOver.bind(this)}
        onMouseOut={this._onMouseOut.bind(this)}
        onClick={this._onClick.bind(this)}>
        <div className="sidebar-item">
          <img src={this.state.hover ? this.props.item.hoverImgPath : this.props.item.imgPath} className="sidebar-icon" />
          <span className="noto">{this.props.item.name}</span>
        </div>
      </Link>
    );
  }
};
