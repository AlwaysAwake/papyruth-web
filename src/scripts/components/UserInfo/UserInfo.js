'use strict';

import React from 'react';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';
import _ from 'underscore';

import { replaceNewline, ellipsis } from '../../utils/Formatter';

import AuthActionCreators from '../../actions/AuthActionCreators';
import UserActionCreators from '../../actions/UserActionCreators';
import EvaluationActionCreators from '../../actions/EvaluationActionCreators';
import CommentActionCreators from '../../actions/CommentActionCreators';
import MailActionCreators from '../../actions/MailActionCreators';

import AuthStore from '../../stores/AuthStore';
import UserStore from '../../stores/UserStore';
import EvaluationStore from '../../stores/EvaluationStore';
import CommentStore from '../../stores/CommentStore';
import MailStore from '../../stores/MailStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;
const CONTENTS_COUNT = ViewConstants.UserInfo.maximumContentsCount;
const CONTENTS_LENGTH = ViewConstants.UserInfo.maximumContentsLength;
const infoItems = ViewConstants.UserInfo.infoItems;
const MAX_BODY_LENGTH = ViewConstants.UserInfo.maximumBodyLength;
const tooltipSettings = ViewConstants.tooltipSettings;

import LoadingComponent from '../Common/LoadingComponent';

import MyEvaluationsItem from './MyEvaluationsItem';
import MyCommentsItem from './MyCommentsItem';
import ItemsNone from './ItemsNone';

const NORMAL_EMAIL = 0;


export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    UserActionCreators.getMyInfo();
    EvaluationActionCreators.getMyEvals(1);
    CommentActionCreators.getMyComments(1);
    AuthActionCreators.fetchUserInfo();
    this.state = {
      myInfo: {},
      myEvals: [],
      myComments: [],
      loadingMyInfo: true,
      loadingMyComments: true,
      loadingMyEvals: true
    };
  }

  componentWillMount() {
    this.userListener = this._onMyInfoLoad.bind(this);
    UserStore.addChangeListener(this.userListener);
    this.evalListener = this._onMyEvalsLoad.bind(this);
    EvaluationStore.addChangeListener(this.evalListener);
    this.commentListener = this._onMyCommentsLoad.bind(this);
    CommentStore.addChangeListener(this.commentListener);
    this.mailListener = this._onSentMail.bind(this);
    MailStore.addChangeListener(this.mailListener);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.userListener);
    EvaluationStore.removeChangeListener(this.evalListener);
    CommentStore.removeChangeListener(this.commentListener);
    MailStore.removeChangeListener(this.mailListener);
  }

  componentWillReceiveProps() {
    if (this.props.route.reload) {
      this.setState({ reload: true });
      UserActionCreators.getMyInfo();
    }
  }

  _onMyInfoLoad() {
    this.setState({ myInfo: UserStore.userInfo, loadingMyInfo: false, reload: false  });
  }

  _onMyEvalsLoad() {
    this.setState({ myEvals: EvaluationStore.myEvals, loadingMyEvals: false });
  }

  _onMyCommentsLoad() {
    this.setState({ myComments: CommentStore.myComments, loadingMyComments: false });
  }

  _onClickResendEmail() {
    MailActionCreators.sendConfirmMail(NORMAL_EMAIL);
  }

  _onSentMail() {
    msgEmitter.success(validationMsg.SEND_CONFIRM_MAIL_SUCCESS);
  }

  _renderMyInfo() {
    const user = AuthStore.user;

    if (this.state.loadingMyInfo) {
      return (<LoadingComponent message={"Loading..."} display={"block"} />);
    }
    else {
      return Object.keys(this.state.myInfo).map((key, idx) => {
        if (_.has(infoItems, key)) {
          let value, button, tooltip;
          if (key === 'confirmed' || key === 'university_confirmed') {
            value = this.state.myInfo[key] === true ? "인증됨" : "인증 안 됨";
            if (key === 'confirmed' && !this.state.myInfo.confirmed) {
              button =
                <button onClick={this._onClickResendEmail.bind(this)} className="btn-redirect course-link-btn" style={{marginLeft: "20px", width: "120px", height: "28px"}}>
                  <span className="evaluation-submit-text noto" style={{ color: "#29B5A9" }}>인증 메일 재전송</span>
                </button>;
            } else if (key === 'university_confirmed' && !this.state.myInfo.university_confirmed) {
              button =
                <Link to="/user/auth/univ_email">
                  <button className="btn-redirect course-link-btn" style={{marginLeft: "20px", width: "120px", height: "28px"}}>
                    <span className="evaluation-submit-text noto" style={{ color: "#29B5A9" }}>학교메일 인증</span>
                  </button>
                </Link>;
              tooltip =
                <i data-tip={tooltipSettings.message.UNIV_EMAIL} data-for="univ-email-tooltip" className="fa fa-2x fa-question-circle" style={{verticalAlign: "middle", marginTop: "-3px"}}></i>
            }
          } else {
            value = this.state.myInfo[key];
          }
          return (
            key === 'university_confirmed' && user.university_id !== 1 ? "" :
              <div key={idx} className="panel-heading">
                <div className="col-xs-4 panel-item" style={{paddingLeft: 0, paddingRight: 0}}>
                  <span className="noto font-bold">{infoItems[key]}</span>
                </div>
                <div className="col-xs-8 panel-item">
                  <span className={"noto"} style={key === 'university_confirmed' ? {verticalAlign: "top"} : {}}>{value}</span>
                  {button}
                  {tooltip}
                  <ReactTooltip id="univ-email-tooltip" class="noto no-spacing" {...tooltipSettings.config} />
                </div>
              </div>
          );
        }
      });
    }
  }

  _renderMyEvals() {
    if (this.state.loadingMyEvals) {
      return (<LoadingComponent message={"Loading..."} display={"block"} />);
    }
    else {
      if (this.state.myEvals.length === 0) {
        return <ItemsNone contentType="evaluation" />;
      }
      else {
        return this.state.myEvals.slice(0, CONTENTS_COUNT).map((eachEval, idx) => {
          let lecTitle = eachEval.lecture_name;
          if (lecTitle.length > CONTENTS_LENGTH)
            lecTitle = lecTitle.substring(0, CONTENTS_LENGTH) + ' ...';

          eachEval.body = ellipsis(replaceNewline(eachEval.body), MAX_BODY_LENGTH);

          return (
            <Link key={idx} to={`/course/${eachEval.course_id}`}>
              <MyEvaluationsItem evaluation={eachEval} index={idx} />
            </Link>
          );
        });
      }
    }
  }

  _renderMyComments() {
    if (this.state.loadingMyComments) {
      return (<LoadingComponent message={"Loading..."} display={"block"} />);
    }
    else {
      if (this.state.myComments.length === 0) {
        return <ItemsNone contentType="comment" />;
      } else {
        return this.state.myComments.slice(0, CONTENTS_COUNT).map((cmt, idx) => {
          let lecTitle = cmt.lecture_name;
          if (lecTitle.length > CONTENTS_LENGTH)
            lecTitle = lecTitle.substring(0, CONTENTS_LENGTH) + ' ...';

          cmt.body = ellipsis(replaceNewline(cmt.body), MAX_BODY_LENGTH);

          return (
            <Link key={idx} to={`/course/${cmt.course_id}`}>
              <MyCommentsItem comment={cmt} index={idx} />
            </Link>
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default panel-card border-normal">
            <div className="panel-heading">
              <span className="panel-title noto no-spacing">내 계정 정보</span>
              <span className="roboto panel-subtitle">MY INFORMATIONS</span>
            </div>
            <div className="panel panel-default" style={{margin: '0', padding: '30px'}}>
              <div className="row">
                <div className="col-xs-4" style={{textAlign: 'center', padding: '15px'}}>
                  <img src={this.state.myInfo.university_image_url} style={{maxWidth: '60%', maxHeight: '60%', margin: '10px'}} />
                  <p className="noto" style={{fontSize: '17px', fontWeight: 'bold'}}>{this.state.myInfo['university_name']}</p>
                </div>
                <div className="col-xs-8" style={{padding: '15px'}}>
                  {this._renderMyInfo()}
                  <div className="row">
                    <div className="col-xs-6" style={{marginTop: '30px'}}>
                      <Link to="/user/profile" className="btn btn-block" style={{background: "#29B5A9", borderRadius: '5px'}}>
                        <span className="noto" style={{color: "#FFF"}}>닉네임 수정</span>
                      </Link>
                    </div>
                    <div className="col-xs-6" style={{marginTop: '30px'}}>
                      <Link to="/user/password" className="btn btn-block" style={{background: "#CCCCCC", borderRadius: '5px'}}>
                        <span className="noto" style={{color: "#FFF"}}>비밀번호 변경</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="panel panel-default panel-card border-normal">
            <div className="panel-heading">
              <span className="panel-title noto no-spacing">내가 작성한 강의평가</span>
              <span className="roboto panel-subtitle">MY EVALUATIONS</span>
              <div className="pull-right">
                <Link to="/user/evaluations">
                  <span className="noto" style={{fontSize: '14px', letterSpacing: '-0.98px', color: '#000'}}>전체 보기</span>
                </Link>
              </div>
            </div>
            {this._renderMyEvals()}
          </div>
        </div>
        <div className="col-xs-12">
          <div className="panel panel-default panel-card border-normal">
            <div className="panel-heading">
              <span className="panel-title noto no-spacing">내가 작성한 댓글</span>
              <span className="roboto panel-subtitle">MY COMMENTS</span>
              <div className="pull-right">
                <Link to="/user/comments">
                  <span className="noto" style={{fontSize: '14px', letterSpacing: '-0.98px', color: '#000'}}>전체 보기</span>
                </Link>
              </div>
            </div>
            {this._renderMyComments()}
          </div>
        </div>
      </div>
    );
  }
};
