'use strict';

import React from 'react';
import { Link } from 'react-router';

import history from '../../history';

import UnivActionCreators from '../../actions/UnivActionCreators';
import MailActionCreators from '../../actions/MailActionCreators';

import UnivStore from '../../stores/UnivStore';
import AuthStore from '../../stores/AuthStore';
import MailStore from '../../stores/MailStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;
const contentText = ViewConstants.UnivEmailAuth;
const UNIV_EMAIL = 1;


export default class UnivEmailAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_domain: '',
      registeredUnivEmail: '',
      emailRegistered: false
    };
    UnivActionCreators.getSingleUnivInfo(AuthStore.user.university_id);
  }

  componentWillMount() {
    if (AuthStore.user.university_confirmed) {
      history.replaceState(null, '/');
    }
    this.univListener = this._onUnivInfoLoaded.bind(this);
    UnivStore.addChangeListener(this.univListener);
    this.mailListener = this._onMailStoreUpdated.bind(this);
    MailStore.addChangeListener(this.mailListener);
  }

  componentWillUnmount() {
    UnivStore.removeChangeListener(this.univListener);
    MailStore.removeChangeListener(this.mailListener);
  }

  _onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  _onClickRegisterEmail() {
    if (this.state.email !== '') {
      MailActionCreators.registerUnivEmail(this.state.email + "@" + this.state.email_domain);
    } else {
      msgEmitter.info(validationMsg.INPUT_UNIV_EMAIL);
    }
  }

  _onClickSendEmail() {
    MailActionCreators.sendConfirmMail(UNIV_EMAIL);
  }

  _onUnivInfoLoaded() {
    this.setState({ email_domain: UnivStore.getSingleUnivInfo().email_domain });
  }

  _onMailStoreUpdated() {
    if (MailStore.actionType === ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_SUCCESS) {
      this.setState({ emailRegistered: true });
      msgEmitter.success(validationMsg.REGISTER_UNIV_MAIL_SUCCESS);
    } else if (MailStore.actionType === ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_ERROR) {
      if (MailStore.error.status === 403) {
        msgEmitter.error(validationMsg.UNIV_EMAIL_ALREADY_EXISTS);
      } else if (MailStore.error.status === 400) {
        msgEmitter.error(validationMsg.INVALID_UNIV_EMAIL_DOMAIN);
      } else {
        msgEmitter.error(validationMsg.GENERAL_ERROR);
      }
    } else if (MailStore.actionType === ActionTypes.REQUEST_SEND_CONFIRM_MAIL_SUCCESS) {
      msgEmitter.success(validationMsg.SEND_CONFIRM_MAIL_SUCCESS);
      history.replaceState(null, '/user/info');
    }
  }

  render() {
    return (
      <div className="panel panel-default border-normal" style={{ minHeight: "768px" }}>
        <div className="panel-body">
          <div className="row" style={{ marginTop: "150px" }}>
            <div className="col-xs-12 text-center">
              <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/emailauth/email.png" alt="" />
            </div>
            <div className="col-xs-12 text-center margin-top40">
              <h3 className="noto font-light" style={{ fontSize: "16px" }}>학교 인증을 위한 이메일을 입력해주세요.</h3>
            </div>
            <div className="col-xs-12 text-center margin-top40 noto font-bold">
              <input className="email-input" placeholder="이메일 입력" onChange={this._onChangeEmail.bind(this)} />
              <span style={{ fontSize: "20px", margin: "auto 10px" }}>@</span>
              <span style={{ fontSize: "20px" }}>{this.state.email_domain}</span>
            </div>
            <div className="col-xs-12 text-center margin-top40">
              <button onClick={this._onClickRegisterEmail.bind(this)} className="btn-submit" style={{ marginRight: "15px" }}>
                <span className="evaluation-submit-text noto">{contentText.registerUnivEmailText}</span>
              </button>
              <button disabled={!this.state.emailRegistered} onClick={this._onClickSendEmail.bind(this)} className={this.state.emailRegistered ? "btn-submit" : "btn-normal"}>
                <span className="evaluation-submit-text noto">{contentText.sendMailButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
