'use strict';

import React from 'react';
import Update from 'react-addons-update';
import _ from 'underscore';

import history from '../../history';

import UserActionCreators from '../../actions/UserActionCreators';
import AuthActionCreators from '../../actions/AuthActionCreators';

import UserStore from '../../stores/UserStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const formItems = ViewConstants.UserInfo.ChangeProfile.formItems;
const iconClass = ViewConstants.UserInfo.ChangeProfile.validation.iconClass;
const formClass = ViewConstants.UserInfo.ChangeProfile.validation.formClass;
const validationMsg = ViewConstants.validationMessages;

export default class ChangeProfile extends React.Component {

  constructor() {
    super();
    let userInfo = UserStore.userInfo;
    this.originalUserInfo = userInfo;
    this.state = {
      userInfo: {
        nickname: userInfo.nickname,
      },
      iconClass: {
        nickname: iconClass.initial
      },
      formClass: {
        nickname: formClass.initial
      },
      validated: true,
      message: []
    };
  }

  componentWillMount() {
    this.delayedCheckDups = _.debounce(this._checkDuplicates, 500);
    this.changeListener = this._onUserStoreUpdated.bind(this);
    UserStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.changeListener);
  }

  _checkDuplicates(item, e) {
    let payload = {
      name: item.name,
      value: item.value
    };
    UserActionCreators.checkDuplicates('changeProfile', payload);
  }

  _handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    let newState;
    if (value === "true" || value === "false") value = value === "true";
    if (field === 'nickname') {
      newState = Update(this.state, {
        iconClass: {
          [field]: { $set: iconClass.initial }
        },
        formClass: {
          [field]: { $set: formClass.initial }
        },
        validated: { $set: UserStore.isValidated() }
      });
      UserStore.resetValidation('changeProfile', field);
      this.delayedCheckDups({ name: field, value: value }, e);
    }
    newState = Update(this.state, {
      userInfo: { [field]: { $set: value } }
    });
    this.setState(newState);
  }

  _infoValidation() {
    let userInfo = this.state.userInfo;
    let messages = [];
    if (userInfo.nickname > 30)
      messages.push(validationMsg.NICKNAME_TOO_LONG);
    messages.map((message, idx) => {
      msgEmitter.error(message);
    });
    return messages.length === 0;
  }

  _onClickSubmit(e) {
    e.preventDefault();
    if (this._infoValidation()) {
      UserActionCreators.changeMyInfo(this.state.userInfo);
    }
  }

  _onUserStoreUpdated() {
    if (UserStore.actionType === ActionTypes.REQUEST_CHECK_DUPLICATES_SUCCESS) {
      let field = UserStore.checkedField;
      let result, newState;
      if (UserStore.checkedResult === null) {
        result = 'initial';
      } else {
        if (this.state.userInfo.nickname === this.originalUserInfo.nickname) {
          result = 'initial'
          newState = Update(this.state, {
            iconClass: {
              [field]: { $set: iconClass[result] }
            },
            formClass: {
              [field]: { $set: formClass[result] }
            },
            validated: { $set: true }
          });
        }
        else {
          result = UserStore.checkedResult ? 'success' : 'failure';
          newState = Update(this.state, {
            iconClass: {
              [field]: { $set: iconClass[result] }
            },
            formClass: {
              [field]: { $set: formClass[result] }
            },
            validated: { $set: UserStore.isValidated() }
          });
        }
        this.setState(newState);
      }
    } else if (UserStore.actionType === ActionTypes.CHANGE_MY_INFORMATIONS_SUCCESS) {
      msgEmitter.success(validationMsg.INFORMATION_CHANGE_SUCCESS);
      AuthActionCreators.fetchUserInfo();
      history.replaceState(null, '/user/info');
    }
  }

  _renderFormItems() {
    return formItems.map((item, idx) => {
      return (
        <div key={idx} className={item.checkDuplicates ? this.state.formClass[item.name] : 'form-group'}>
          <label className="col-xs-4 control-label noto" htmlFor={item.name}>{item.label}</label>
          <div className="col-xs-6">
            <input className="form-control noto"
              id={"change-profile-" + item.name}
              key={idx}
              name={item.name}
              type={item.type}
              value={this.state.userInfo[item.name]}
              placeholder={item.placeholder}
              onChange={this._handleChange.bind(this)}
              required
              autoComplete="off" />
            <span className={item.checkDuplicates ? this.state.iconClass[item.name] : ''}></span>
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
            <span className="panel-title noto no-spacing">닉네임 변경</span>
            <span className="roboto panel-subtitle">Change Profile</span>
          </header>
        </div>
        <div className="panel-body">
          <div className="form-horizontal form-border">
            {this._renderFormItems()}
            <div className="form-group text-center margin-top50">
              <label className="col-xs-4 control-label">&nbsp;</label>
              <div className="col-xs-6">
                <button onClick={this._onClickSubmit.bind(this)} disabled={!this.state.validated} className="btn btn-primary btn-block noto" type="submit">수정하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
