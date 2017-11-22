'use strict';

import React from 'react';
import { Link } from 'react-router';

import history from '../../history';

import MailActionCreators from '../../actions/MailActionCreators';

import AuthStore from '../../stores/AuthStore';
import MailStore from '../../stores/MailStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;
const contentText = ViewConstants.EmailAuth;
const NORMAL_EMAIL = 0;


export default class EmailAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (AuthStore.user.confirmed) {
      history.replaceState(null, '/');
    }
    this.changeListener = this._onMailStoreUpdated.bind(this);
    MailStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    MailStore.removeChangeListener(this.changeListener);
  }

  _onClickSendEmail() {
    MailActionCreators.sendConfirmMail(NORMAL_EMAIL);
  }

  _onMailStoreUpdated() {
    msgEmitter.success(validationMsg.SEND_CONFIRM_MAIL_SUCCESS);
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
              <h3 className="noto font-light">{"이 게시물을 보기 위해서는 " + contentText.name + " 인증이 필요합니다."}</h3>
            </div>
            <div className="col-xs-12 text-center margin-top40">
              <button onClick={this._onClickSendEmail.bind(this)} className="btn-submit">
                <span className="evaluation-submit-text noto">{contentText.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
