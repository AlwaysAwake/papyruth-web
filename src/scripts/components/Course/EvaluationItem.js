'use strict';

import React from 'react';
import { Link } from 'react-router';
import { timeStamp } from '../../utils/TimeConverter';
import { splitByNewline } from '../../utils/Formatter';

import AuthStore from '../../stores/AuthStore'
import EvaluationStore from '../../stores/EvaluationStore'

import EvaluationReport from './EvaluationReport';

import RatingStars from '../Common/RatingStars';

export default class EvaluationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpened: false };
    this._onClickMore = this._onClickMore.bind(this);
    this._onFocusOutMore = this._onFocusOutMore.bind(this);
  }

  _deleteEval(e) {
    e.preventDefault();
    this.props.deleteEval();
  }

  _upVote(e) {
    e.preventDefault();
    this.props.upVote(this.props.evaluation.id, this.props.evaluation.request_user_vote);
  }

  _downVote(e) {
    e.preventDefault();
    this.props.downVote(this.props.evaluation.id, this.props.evaluation.request_user_vote);
  }

  _upVoteUsers(e) {
    e.preventDefault();
    this.props.upVoteUsers(this.props.evaluation.id);
  }

  _downVoteUsers(e) {
    e.preventDefault();
    this.props.downVoteUsers(this.props.evaluation.id);
  }

  _openModal(e) {
    e.preventDefault();
    this.setState({ modalOpened: true });
    e.stopPropagation();
  }

  _closeModal() {
    this.setState({ modalOpened: false });
  }

  _onClickMore(e) {
    const { evaluation, onClickMore, clickedId, clickedItem } = this.props;
    if (clickedId === evaluation.id && clickedItem === 'evaluation') {
      onClickMore(-1, '');
    } else {
      onClickMore(evaluation.id, 'evaluation');
    }
    e.stopPropagation();
  }

  _onFocusOutMore() {
    this.props.onClickMore(-1, '');
  }

  render() {
    const { evaluation, clickedId, clickedItem } = this.props;

    const graphObj = {
      '강의력': [evaluation.point_clarity, "#df5c5b"],
      '널널함': [evaluation.point_easiness, "#27b3ad"],
      '학점만족도': [evaluation.point_gpa_satisfaction, "#52698d"]
    };

    let graphItem = Object.keys(graphObj).map((key, idx) => {
      return (
        <div key={idx}>
          <div className="text-right" style={{display: 'inline-block', width: '40%', marginRight: '5px'}}>
            <span className="noto" style={{fontSize: '11px', color: graphObj[key][1]}}>{key}&nbsp;</span>
          </div>
          <div className="progress progress-xs" style={{display: 'inline-block', marginBottom: '0px', marginTop: '5px', marginRight: '5px', height: '10px', width: '45%'}}>
            <div className="progress-bar progress-bar-info" role="progressbar" ariaValuenow={graphObj[key][0]} ariaValuemin="0" ariaValuemax="10" style={{width: graphObj[key][0]*10 + '%', backgroundColor: graphObj[key][1], borderRadius: '4px'}}>
            </div>
          </div>
          <div style={{display: 'inline-block', width: '5%'}}>
            <span className="roboto" style={{color: graphObj[key][1], paddingLeft: '5px', fontWeight: 'bold', fontSize: '11px'}}>{graphObj[key][0]}</span>
          </div>
        </div>
      );
    });

    let evaluationBody = evaluation.university_confirmation_needed
      ? <Link to="/user/auth/univ_email">
          <span className="noto" style={{fontSize: "17px", color: "#808080"}}><span style={{color: "#29B5A9"}}>대학 인증</span>이 필요한 게시물입니다.</span>
        </Link>
      : splitByNewline(evaluation.body).map((item, idx) => {
        return (
          <span key={idx} className="noto dont-break-out" style={{fontSize: "13px", color: "#808080"}}>
            {item}
            <br />
          </span>
        );
      });

    let upVoteIcon = (evaluation.request_user_vote === 1) ? <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up_clicked.png" /> : <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up.png" />;
    let downVoteIcon = (evaluation.request_user_vote === 0) ? <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down_clicked.png" /> : <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down.png" />;

    let isMyEvaluation = evaluation.user_id === AuthStore.user.id;

    let clickedMoreButton = isMyEvaluation ?
      <div className={(clickedId === evaluation.id && clickedItem === 'evaluation') ? 'more-wrapper more-show' : 'more-wrapper more-hide'}>
        <div style={{marginBottom: '10px', textAlign: 'right'}}>
          <Link to={`/evaluation/update/${this.props.courseID}/${EvaluationStore.getWrittenEvalId()}`}>
            <img className="more-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/delete.png" />
            <span className="noto" style={{fontSize: '12px', color: '#4D4D4D'}}>수정하기</span>
          </Link>
        </div>
        <div style={{textAlign: 'right'}}>
          <a href="#" onClick={this._deleteEval.bind(this)}>
            <img className="more-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/delete.png" />
            <span className="noto" style={{fontSize: '12px', color: '#4D4D4D'}}>삭제하기</span>
          </a>
        </div>
      </div>
      :
      <div className={(clickedId === evaluation.id && clickedItem === 'evaluation') ? 'more-wrapper more-show' : 'more-wrapper more-hide'}>
        <div style={{textAlign: 'right'}}>
          <a href="#" onClick={this._openModal.bind(this)}>
            <img className="more-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/rsz_report.png" />
            <span className="noto" style={{fontSize: '12px', color: '#4D4D4D'}}>신고하기</span>
          </a>
        </div>
      </div>;

    return (
      <div className="row wrapper" style={{marginBottom: '0px', paddingTop: '20px', marginTop: '0px'}}>
        <div className="col-xs-12">
          <div style={{position: 'absolute', top: '6px', left: '7px', paddingTop: '6px'}}>
            <img src={evaluation ? evaluation.avatar_url : ""} style={{width: '55px', height: '55px', borderRadius: '50%'}} />
          </div>
          <div onClick={this._onFocusOutMore} className="post default" style={{borderStyle: "solid", borderColor: "#ececec", borderWidth: "1px", borderRadius: "12px", backgroundColor: "#f7f7f7", marginLeft: '65px', padding: '15px'}}>
            <span className="arrow left" style={{color: "#f7f7f7", top: '30px'}}></span>
            <div style={{position: 'relative', width: '80%', display: 'inline-block', paddingLeft: '10px'}}>
              <span className="noto" style={{fontSize: "16px", color: "#333", marginBottom: '5px'}}>{evaluation.user_nickname}</span>
              <div style={{ marginTop: '20px', marginBottom: '5px' }}>
                {evaluationBody}
              </div>
              {
                evaluation.university_confirmation_needed
                ? ""
                :
                <div style={{position: 'absolute', top: 1, right: 0}}>
                  <div style={{height: '24px'}}>
                    <img onClick={this._onClickMore} className="hover-opacity-70 cursorlink" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/more.png" style={{float: 'right'}}/>
                  </div>
                  {clickedMoreButton}
                </div>
              }
              {
                evaluation.university_confirmation_needed
                ? ""
                :
                <div style={{paddingTop: "20px"}}>
                  <div className="hover-opacity-70" style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
                    <a href="#" onClick={this._upVote.bind(this)} style={{marginRight: '10px'}}>
                      <img src={(evaluation.request_user_vote === 1) ? "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up_clicked.png" : "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up.png"} />
                    </a>
                    <a href="#" onClick={this._upVoteUsers.bind(this)} style={{marginRight: '10px'}}>
                      <span className="noto" style={{fontSize: '12px', color: '#C93940'}}>좋아요</span>
                    </a>
                    <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#C93940'}}>{evaluation.up_vote_count}</span>
                  </div>
                  <div className="hover-opacity-70" style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
                    <a href="#" onClick={this._downVote.bind(this)} style={{marginRight: '10px'}}>
                      <img src={(evaluation.request_user_vote === 0) ? "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down_clicked.png" : "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down.png"} />
                    </a>
                    <a href="#" onClick={this._downVoteUsers.bind(this)} style={{marginRight: '10px'}}>
                      <span className="noto" style={{fontSize: '12px', color: '#245084'}}>싫어요</span>
                    </a>
                    <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#245084'}}>{evaluation.down_vote_count}</span>
                  </div>
                  <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
                    <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/reply.png" style={{marginRight: '10px'}}/>
                    <span className="noto" style={{fontSize: '12px', color: '#4D4D4D', marginRight: '10px'}}>댓글</span>
                    <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#4D4D4D'}}>{evaluation.comment_count}</span>
                  </div>
                  <EvaluationReport modalOpened={this.state.modalOpened} evalId={evaluation.id} closeModal={this._closeModal.bind(this)} />
                </div>
              }
            </div>
            {
              evaluation.university_confirmation_needed
              ? ""
              :
                <div className="hover-opacity-70 pull-right" style={{width: '20%', display: 'inline-block'}}>
                  <div className="text-right" style={{marginRight: "10px"}}>
                    <h4 className="noto no-spacing">{timeStamp(evaluation.created_at)}</h4>
                    <RatingStars stars={5} point={10} score={evaluation.point_overall} color="#E84646" size={1} style={{ display: "inline-block" }} starStyle={{ marginRight: "3px" }} />
                    <span className="roboto font-ubold font-italic" style={{fontSize: "35px", color: "#E84646", marginLeft: "5px"}}>{evaluation.point_overall}</span>
                  </div>
                  {graphItem}
                </div>
            }
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
};
