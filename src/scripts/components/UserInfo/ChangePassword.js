'use strict';

import React from 'react';
import Update from 'react-addons-update';
import _ from 'underscore';

import history from '../../history';

import UserActionCreators from '../../actions/UserActionCreators';

import UserStore from '../../stores/UserStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const formItems = ViewConstants.UserInfo.ChangePassword.formItems;
const validationMsg = ViewConstants.validationMessages;

export default class ChangePassword extends React.Component {

  constructor() {
    super();
    this.state = {
      userInfo: {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      },
      message: []
    }
  }

  componentWillMount() {
    this.changeListener = this._onUserStoreUpdated.bind(this);
    UserStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.changeListener);
  }

  _handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    let newState = Update(this.state, {
      userInfo: { [field]: { $set: value } }
    });
    this.setState(newState);
  }

  _infoValidation() {
    let userInfo = this.state.userInfo;
    let messages = [];
    if (userInfo.new_password !== userInfo.confirm_new_password)
      messages.push(validationMsg.PASSWORDS_DOESNT_MATCH);
    if (userInfo.new_password.length < 8)
      messages.push(validationMsg.PASSWORD_TOO_SHORT);
    if (userInfo.old_password === userInfo.new_password)
      messages.push(validationMsg.PASSWORD_MUST_DIFFER_FROM_PREVIOUS);
    messages.map((message, idx) => {
      msgEmitter.error(message);
    });
    return messages.length === 0;
  }

  _onClickSubmit(e) {
    e.preventDefault();
    if (this._infoValidation()) {
      UserActionCreators.changeMyPassword(_.omit(this.state.userInfo, 'confirm_new_password'));
    }
  }

  _onUserStoreUpdated() {
    if (UserStore.actionType === ActionTypes.CHANGE_MY_PASSWORD_SUCCESS) {
      msgEmitter.success(validationMsg.PASSWORD_CHANGE_SUCCESS);
      history.replaceState(null, '/user/info');
    }
  }

  _renderFormItems() {
    return formItems.map((item, idx) => {
      return (
        <div key={idx} className="form-group">
          <label className="col-xs-4 control-label noto" htmlFor={item.name}>{item.label}</label>
          <div className="col-xs-6">
            <input className="form-control noto"
              id={"change-password-" + item.name}
              key={idx}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
              onChange={this._handleChange.bind(this)}
              required
              autoComplete="off" />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="panel panel-default border-normal">
        <div className="panel-heading">
          <header>
            <span className="panel-title noto no-spacing">비밀번호 변경</span>
            <span className="roboto panel-subtitle">Change Password</span>
          </header>
        </div>
        <div className="panel-body">
          <div className="form-horizontal form-border">
            {this._renderFormItems()}
            <div className="form-group text-center margin-top50">
              <label className="col-xs-4 control-label">&nbsp;</label>
              <div className="col-xs-6">
                <button onClick={this._onClickSubmit.bind(this)} className="btn btn-primary btn-block noto" type="submit">변경하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
