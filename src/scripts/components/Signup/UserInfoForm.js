'use strict';

import React, { findDOMNode } from 'react';
import Update from 'react-addons-update';
import _ from 'underscore';
import classNames from 'classnames';

import UserActionCreators from '../../actions/UserActionCreators';

import UserStore from '../../stores/UserStore';

import ViewConstants from '../../constants/ViewConstants';
const entranceYearSet = ViewConstants.Signup.UserInfoForm.entranceYearSet;
const formItems = ViewConstants.Signup.UserInfoForm.formItems;
const iconClass = ViewConstants.Signup.UserInfoForm.validation.iconClass;
const formClass = ViewConstants.Signup.UserInfoForm.validation.formClass;
const validationMsg = ViewConstants.validationMessages;

const ALREADY_EXISTS = 1;
const LEGACY_USER = 2;

export default class UserInfoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconClass: {
        email: iconClass.initial,
        nickname: iconClass.initial
      },
      formClass: {
        email: formClass.initial,
        nickname: formClass.initial
      },
      validated: UserStore.isValidated()
    };
  }

  componentWillMount() {
    this.delayedCheckDups = _.debounce(this._checkDuplicates, 500);
    this.changeListener = this._onDuplicatesChecked.bind(this);
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
    UserActionCreators.checkDuplicates('signup', payload);
  }

  _onDuplicatesChecked() {
    let field = UserStore.checkedField;
    if (field) {
      let result;
      if (UserStore.checkedResult === null) {
        result = 'initial';
      } else {
        result = UserStore.checkedResult ? 'success' : 'failure';
      }
      let newState = Update(this.state, {
        iconClass: {
          [field]: { $set: iconClass[result] }
        },
        formClass: {
          [field]: { $set: formClass[result] }
        },
        validated: { $set: UserStore.isValidated() }
      });
      this.setState(newState);
    }
    if (UserStore.checkedStatus === ALREADY_EXISTS) {
      msgEmitter.error("이미 사용중인 " + (field === "email" ? "이메일" : "닉네임") + "입니다.");
    } else if (field === "email" && UserStore.checkedStatus === LEGACY_USER) {
      msgEmitter.info(validationMsg.LEGACY_USER_EXISTS);
    }
  }

  _handleChange(e) {
    let field = e.target.name;
    this.props.onChange(e.target.name, e.target.value);
    if (e.target.name === 'email' || e.target.name === 'nickname') {
      let newState = Update(this.state, {
        iconClass: {
          [field]: { $set: iconClass.initial }
        },
        formClass: {
          [field]: { $set: formClass.initial }
        },
        validated: { $set: UserStore.isValidated() }
      });
      this.setState(newState);
      this.delayedCheckDups({name: e.target.name, value: e.target.value}, e);
    }
  }

  _renderFormItems() {
    return formItems.map((item, idx) => {
      return (
        <div key={idx} className={item.checkDuplicates ? this.state.formClass[item.name] : 'form-group'}>
          <label className="col-xs-4 noto control-label" htmlFor={item.name}>{item.label}</label>
          <div className="col-xs-6">
            <input className="form-control noto"
              id={"signup-" + item.name}
              key={idx}
              name={item.name}
              type={item.type}
              ref={item.name}
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
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-horizontal form-border">
                {this._renderFormItems()}
                <div className="form-group">
                  <label className="col-xs-4 noto control-label">입학년도</label>
                  <div className="col-xs-6">
                    <select name="entrance_year" onChange={this._handleChange.bind(this)} className="form-control noto" style={{paddingTop: "4px"}} required>
                      {
                        entranceYearSet.map((year, idx) => {
                          return <option key={idx} value={parseInt(year)}>{year}</option>;
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-xs-4 noto control-label">성별</label>
                  <div className="col-xs-6">
                    <div style={{paddingTop: 7}}>
                      <input type="radio" onChange={this._handleChange.bind(this)} name="is_boy" value="true" />
                      <h4 className="noto" style={{display: "inline-block", marginRight: 10}}>&nbsp;남자</h4>
                      <input type="radio" onChange={this._handleChange.bind(this)} name="is_boy" value="false" />
                      <h4 className="noto" style={{display: "inline-block"}}>&nbsp;여자</h4>
                    </div>
                  </div>
                  <div className="form-group text-center margin-top50">
                    <label className="col-xs-4 noto control-label">&nbsp;</label>
                    <div className="col-xs-6">
                      <button onClick={this.props.onClick} disabled={!this.state.validated} className="btn btn-primary noto btn-block" type="submit">가입하기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
