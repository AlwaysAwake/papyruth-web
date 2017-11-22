'use strict';

import React from 'react';
import { Link } from 'react-router';

import history from '../../history';

import MailActionCreators from '../../actions/MailActionCreators';

import MailStore from '../../stores/MailStore';

import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;

import { validateEmail } from '../../utils/Validator';


export default class FindPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: [],
      msgColor: "#000000"
    };
  }

  componentWillMount() {
    this.changeListener = this._onResponseFromServer.bind(this);
    MailStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    MailStore.removeChangeListener(this.changeListener);
  }

  _onChange(e) {
    this.setState({ email: e.target.value });
  }

  _emailValidation() {
    let email = this.state.email;
    return !(
      email.indexOf('@') === -1 ||
      email.indexOf('.') === -1 ||
      email.indexOf('@') > email.indexOf('.')
    );
  }

  _onClickSend() {
    if (validateEmail(this.state.email)) {
      MailActionCreators.sendPasswordRenewMail(this.state.email);
    } else {
      let message = [];
      message.push(validationMsg.INVALID_EMAIL);
      this.setState({ message: message, msgColor: "red" });
    }
  }

  _onResponseFromServer() {
    msgEmitter.success(validationMsg.SEND_PASSWORD_RENEW_MAIL_SUCCESS);
    history.replaceState(null, '/signin');
  }

  _renderMsg() {
    return this.state.message.map((msg, idx) => {
      return (
        <div key={idx} className="col-xs-12">
          <h4 className="text-center noto" style={{color: this.state.msgColor, fontSize: "12px"}}>
            {msg}
          </h4>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="container" style={{width: '50%'}}>
        <section id="main-content">
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <header>
                    <span className="noto no-spacing panel-title">비밀번호 찾기</span>
                    <span className="roboto panel-subtitle">FIND PASSWORD</span>
                  </header>
                </div>
                <div className="panel-body">
                  <h3 className="noto">이메일 계정을 입력해주세요.</h3>
                </div>
                <div className="panel-body">
                  <input className="form-control" type="email" onChange={this._onChange.bind(this)} value={this.state.email} placeholder="이메일 입력" />
                </div>
                <div className="panel-body">
                  {this._renderMsg()}
                </div>
                <div className="panel-footer text-center">
                  <button onClick={this._onClickSend.bind(this)} className="btn-submit">
                    <span className="evaluation-submit-text noto">변경 메일 전송</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
};
