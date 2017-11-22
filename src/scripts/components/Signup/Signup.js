'use strict';

import React from 'react';
import Update from 'react-addons-update';
import classNames from 'classnames';

import history from '../../history';

import AuthActionCreators from '../../actions/AuthActionCreators';
import UnivActionCreators from '../../actions/UnivActionCreators';
import CommonActionCreators from '../../actions/CommonActionCreators';

import AuthStore from '../../stores/AuthStore';
import UnivStore from '../../stores/UnivStore';
import UserStore from '../../stores/UserStore';

import UnivSelectItem from './UnivSelectItem';
import UserInfoForm from './UserInfoForm';
import Terms from '../Terms/Terms';

import { validateEmail } from '../../utils/Validator';

import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;

const TERMS = 1;
const PRIVACY_POLICY = 2;


export default class Signup extends React.Component {

  constructor() {
    super();
    this.state = {
      userInfo: {
        email: '',
        password: '',
        confirm_password: '',
        realname: '',
        nickname: '',
        is_boy: null,
        university_id: -1,
        entrance_year: 2016
      },
      progressBar: {
        step1: classNames('active'),
        step2: ''
      },
      pane: {
        step1: classNames('step-pane', 'active'),
        step2: classNames('step-pane')
      },
      univList: [],
      message: [],
      modalOpened: false
    };
    if (AuthStore.isSignedIn()) {
      history.replaceState(null, '/');
    } else {
      UnivActionCreators.getUnivInfo();
    }
  }

  componentWillMount() {
    this.univChangeListener = this._onUnivInfoLoad.bind(this);
    this.authChangeListener = this._onSignupSuccess.bind(this);
    UnivStore.addChangeListener(this.univChangeListener);
    AuthStore.addChangeListener(this.authChangeListener);
  }

  componentWillUnmount() {
    UnivStore.removeChangeListener(this.univChangeListener);
    AuthStore.removeChangeListener(this.authChangeListener);
  }

  _openModal(target, e) {
    e.preventDefault();
    CommonActionCreators.getModalContents(target);
    this.setState({ modalOpened: true });
    e.stopPropagation();
  }

  _closeModal() {
    this.setState({ modalOpened: false });
  }

  _onUnivInfoLoad() {
    let newState = Update(this.state, {
      univList: {$set: UnivStore.getUnivInfo()}
    });
    this.setState(newState);
  }

  _infoValidation() {
    let userInfo = this.state.userInfo;
    let messages = [];
    if (!validateEmail(userInfo.email))
      messages.push(validationMsg.INVALID_EMAIL);
    if (userInfo.password !== userInfo.confirm_password)
      messages.push(validationMsg.PASSWORDS_DOESNT_MATCH);
    if (userInfo.password === '' || userInfo.confirm_password === '')
      messages.push(validationMsg.INPUT_PASSWORD);
    if (userInfo.password.length < 8)
      messages.push(validationMsg.PASSWORD_TOO_SHORT);
    if (userInfo.nickname > 30)
      messages.push(validationMsg.NICKNAME_TOO_LONG);
    if (userInfo.realname > 30)
      messages.push(validationMsg.REALNAME_TOO_LONG);
    if (userInfo.university_id === -1)
      messages.push(validationMsg.SELECT_UNIVERSITY);
    if (userInfo.is_boy === null)
      messages.push(validationMsg.SELECT_GENDER);
    if (userInfo.realname === '')
      messages.push(validationMsg.INPUT_REALNAME);
    messages.map((message, idx) => {
      msgEmitter.info(message);
    });
    return messages.length === 0;
  }

  signup(e) {
    e.preventDefault();
    if (this._infoValidation()) {
      AuthActionCreators.signup(this.state.userInfo);
    }
  }

  _onProgressBarClick(e) {
    e.preventDefault();
    let newState = Update(this.state, {
      progressBar: {
        step1: { $set: classNames('active') },
        step2: { $set: '' }
      },
      pane: {
        step1: { $set: classNames('step-pane', 'active') },
        step2: { $set: classNames('step-pane')}
      }
    });
    this.setState(newState);
  }

  _onSelectUniv(univId, e) {
    e.preventDefault();
    let newState = Update(this.state, {
      userInfo: { university_id: { $set: univId } },
      progressBar: {
        step1: { $set: classNames('complete') },
        step2: { $set: classNames('active') }
      },
      pane: {
        step1: { $set: classNames('step-pane') },
        step2: { $set: classNames('step-pane', 'active')}
      }
    });
    this.setState(newState);
  }

  _handleFieldChange(field, value) {
    if (field === "email" || field === "nickname") {
      UserStore.resetValidation('signup', field);
    }
    let newState = Update(this.state, {
      userInfo: { [field]: { $set: value } }
    });
    this.setState(newState);
  }

  _onSignupSuccess() {
    msgEmitter.success(validationMsg.SIGNUP_SUCCESS);
    history.replaceState(null, '/');
  }

  _renderUnivStepItem() {
    return [1, 2].map((item, idx) => {
      let steps = "step" + item;
      return (
        <li key={idx} className={this.state.progressBar[steps]} onClick={this._onProgressBarClick.bind(this)}>
          <span className="badge roboto badge-success">{item}</span>
          <span className="roboto">Step {item}</span>
          <span className="chevron"></span>
        </li>
      );
    });
  }

  _renderUnivSelectItem() {
    return this.state.univList.map((univ, idx) => {
      return (
        <UnivSelectItem
          onClick={this._onSelectUniv.bind(this, univ.id)}
          key={idx}
          univId={univ.id}
          univName={univ.name}
          univImgPath={univ.image_url}
          univEngName={univ.english_name} />
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
                    <span className="noto no-spacing panel-title">회원 가입</span>
                    <span className="roboto panel-subtitle">SIGN UP</span>
                  </header>
                </div>
                <div className="panel-body">
                  <section className="fuelux">
                    <div id="select-university-wizard" className="wizard">
                      <ul className="steps">
                        {this._renderUnivStepItem()}
                      </ul>
                    </div>
                    <div className="step-content">
                      <div className={this.state.pane.step1}>
                        <div className="pageheader" style={{marginBottom: "20px"}}>
                          <h4 className="noto">대학교 선택</h4>
                        </div>
                        <div className="row">
                          {this._renderUnivSelectItem()}
                        </div>
                      </div>
                      <div className={this.state.pane.step2}>
                        <div className="pageheader" style={{marginBottom: "20px"}}>
                          <h4 className="noto">추가 정보 입력</h4>
                        </div>
                        <UserInfoForm onClick={this.signup.bind(this)} onChange={this._handleFieldChange.bind(this)} />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="col-xs-12 text-center">
              <span className="noto">계속 진행하시면 본 서비스의 </span>
              <a href="#" onClick={this._openModal.bind(this, PRIVACY_POLICY)}>
                <span className="noto font-bold" style={{ color: '#27B3AD' }}>개인정보 취급방침</span>
              </a>
              <span className="noto">과 </span>
              <a href="#" onClick={this._openModal.bind(this, TERMS)}>
                <span className="noto font-bold" style={{ color: '#27B3AD' }}>약관</span>
              </a>
              <span className="noto">에 동의하게 됩니다.</span>
            </div>
            <Terms modalOpened={this.state.modalOpened} closeModal={this._closeModal.bind(this)} />
          </div>
        </section>
      </section>
    );
  }
}
