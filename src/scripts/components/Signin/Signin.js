'use strict';

import React from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import history from '../../history';

import AuthActionCreators from '../../actions/AuthActionCreators';
import UserActionCreators from '../../actions/UserActionCreators';

import AuthStore from '../../stores/AuthStore';

import TotalStatistics from './TotalStatistics';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
import ApiConstants from '../../constants/ApiConstants';
import { domainServiceMap } from '../../constants/Config';

const errorMsg = ViewConstants.Signin.errorMsg;
const noSubDomain = ApiConstants.subDomain === "papyruth" || process.env.NODE_ENV !== "production";

export default class Signin extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
      showMsg: 'none'
    };
    if (AuthStore.isSignedIn()) {
      history.replaceState(null, '/');
    }
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._onSigninAttempt.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onSigninAttempt.bind(this));
  }

  signin(e) {
    e.preventDefault();
    AuthActionCreators.signin(this.state.email, this.state.password);
  }

  signinByEnter(e) {
    if (e.keyCode === 13) {
      AuthActionCreators.signin(this.state.email, this.state.password);
    }
  }

  _onSigninAttempt() {
    if (AuthStore.actionType === ActionTypes.REQUEST_SIGNIN_USER_SUCCESS) {
      history.replaceState(null, '/');
    } else if (AuthStore.actionType === ActionTypes.REQUEST_SIGNIN_USER_ERROR) {
      this.setState({ message: errorMsg, showMsg: 'block' });
    }
  }

  render() {
    return (
      <section className="container" style={{overflowX: "hidden", overflowY: "scroll", width: "100%", height: "100%"}}>
        <div className="row text-center" style={{marginTop: '100px'}}>
          <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/signin/logo.png" style={{margin: '0 auto', display: 'block'}} />
        </div>
        <TotalStatistics />
        <div className="row">
          <div id="login-wrapper">
            <form className="form-horizontal" role="form">
              <div className="form-group" style={{marginBottom: '3px'}}>
                <div className="col-xs-12">
                  <input type="email" valueLink={this.linkState('email')} className="form-control" id="email" name="email" placeholder="Email" />
                </div>
              </div>
              <div className="form-group" style={{marginTop: '3px'}}>
                <div className="col-xs-12">
                  <input type="password" onKeyDown={this.signinByEnter.bind(this)} valueLink={this.linkState('password')} className="form-control" id="password" name="password" placeholder="Password" />
                </div>
              </div>
              <div className="form-group" style={{display: this.state.showMsg}}>
                <div className="col-xs-12">
                  <h4 className="text-center noto" style={{color: "red", fontSize: "12px"}}>
                    {this.state.message}
                  </h4>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <div id="signin-button" className="cursorlink" type="submit" onClick={this.signin.bind(this)}>
                    <span className="noto" style={{fontSize: '14px', color: '#FFFFFF'}}>SIGN IN</span>
                  </div>
                  <div id="signup-button">
                    <Link to="/signup" className="btn btn-block" style={{paddingTop: '5px'}}>
                      <span className="noto" style={{fontSize: '14px', color: '#60C8C4'}}>JOIN</span>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="text-center">
              <Link to="/find/password">
                <span className="noto cursorlink" style={{fontSize: '13px'}}>비밀번호 찾기</span>
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a className="noto" href={"https://api.papyruth.com/users" + (noSubDomain ? "" : ("/" + ApiConstants.subDomain)) + "/migrate"} target="_blank" style={{fontSize: '13px', color: ""}}>{noSubDomain ? "SNUEV" : domainServiceMap[ApiConstants.subDomain]} 회원이세요?</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

ReactMixin(Signin.prototype, LinkedStateMixin);
