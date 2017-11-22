'use strict';

import React from 'react';
import history from '../../history';

import AuthActionCreators from '../../actions/AuthActionCreators';

export default class SignoutButton extends React.Component {

  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  signOut(e) {
    e.preventDefault();
    AuthActionCreators.signout();
  }

  _onMouseOver() {
    this.setState({ hover: true });
  }

  _onMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <nav>
        <ul className="nav nav-pills nav-stacked" style={{marginLeft: '0px', marginRight: '0px'}}>
          <div className="sidebar-item" onMouseOver={this._onMouseOver.bind(this)} onMouseOut={this._onMouseOut.bind(this)} onClick={this.signOut} style={{ cursor: "pointer" }}>
            <img src={this.state.hover ? '//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/signout_h.png' : '//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/signout.png'} className="sidebar-icon" />
            <span className="noto">로그아웃</span>
          </div>
        </ul>
      </nav>
    );
  }
};
