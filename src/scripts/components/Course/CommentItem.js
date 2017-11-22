'use strict';

import React from 'react';
import { timeStamp } from '../../utils/TimeConverter';

import AuthStore from '../../stores/AuthStore';

import CommentReport from './CommentReport';

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this._onClickMore = this._onClickMore.bind(this);
    this.state = { modalOpened: false };
  }

  _deleteComment(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment.id);
  }

  _upVote(e) {
    e.preventDefault();
    this.props.upVote(this.props.comment.evaluation_id, this.props.comment.id, this.props.comment.request_user_vote);
  }

  _downVote(e) {
    e.preventDefault();
    this.props.downVote(this.props.comment.evaluation_id, this.props.comment.id, this.props.comment.request_user_vote);
  }

  _upVoteUsers(e) {
    e.preventDefault();
    this.props.upVoteUsers(this.props.comment.id);
  }

  _downVoteUsers(e) {
    e.preventDefault();
    this.props.downVoteUsers(this.props.comment.id);
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
    const { comment, onClickMore, clickedId, clickedItem } = this.props;
    if (clickedId === comment.id && clickedItem === 'comment') {
      onClickMore(-1, '');
    } else {
      onClickMore(comment.id, 'comment');
    }
    e.stopPropagation();
  }

  render() {
    const { comment, clickedId, clickedItem } = this.props;

    let isMyComment = comment.user_id === AuthStore.user.id;

    let clickedMoreButton = isMyComment ?
      <div className={(clickedId === comment.id && clickedItem === 'comment') ? 'more-wrapper more-show' : 'more-wrapper more-hide'}>
        <div style={{textAlign: 'right'}}>
          <a href="#" onClick={this._deleteComment.bind(this)}>
            <img className="more-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/delete.png" />
            <span className="noto" style={{fontSize: '12px', color: '#4D4D4D'}}>삭제하기</span>
          </a>
        </div>
      </div>
      :
      <div className={(clickedId === comment.id && clickedItem === 'comment') ? 'more-wrapper more-show' : 'more-wrapper more-hide'}>
        <div style={{textAlign: 'right'}}>
          <a href="#" onClick={this._openModal.bind(this)}>
            <img className="more-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/rsz_report.png" />
            <span className="noto" style={{fontSize: '12px', color: '#4D4D4D'}}>신고하기</span>
          </a>
        </div>
      </div>;

    return (
      <div className="post default comment-body" commentID={comment.id}>
        <div style={{position: 'relative', display: 'inline-block', width: '85%'}}>
          <img src={comment.avatar_url} style={{width: '25px', height: '25px', margin: '5px', borderRadius: '50%'}} />
          <span className="noto" style={{fontSize: '14px', color: '#666666', marginLeft: '5px', marginBottom: '10px'}}>{comment.user_nickname}</span>
          <p className="noto dont-break-out" style={{fontSize: '13px', color: '#808080', marginLeft: '5px', marginTop: '10px'}}>{comment.body}</p>
          <div style={{right: '0px'}}>
            <div className="hover-opacity-70" style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
              <a href="#" onClick={this._upVote.bind(this)} style={{marginRight: '10px'}}>
                <img src={(comment.request_user_vote === 1) ? "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up_clicked.png" : "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up.png"} />
              </a>
              <a href="#" onClick={this._upVoteUsers.bind(this)} style={{marginRight: '10px'}}><span className="noto" style={{fontSize: '12px', color: '#C93940'}}>좋아요</span></a>
              <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#C93940'}}>{comment.up_vote_count}</span>
            </div>
            <div className="hover-opacity-70" style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
              <a href="#" onClick={this._downVote.bind(this)} style={{marginRight: '10px'}}>
                <img src={(comment.request_user_vote === 0) ? "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down_clicked.png" : "//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down.png"} />
              </a>
              <a href="#" onClick={this._downVoteUsers.bind(this)} style={{marginRight: '10px'}}><span className="noto" style={{fontSize: '12px', color: '#245084'}}>싫어요</span></a>
              <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#245084'}}>{comment.down_vote_count}</span>
            </div>
            <CommentReport modalOpened={this.state.modalOpened} commentId={comment.id} closeModal={this._closeModal.bind(this)} />
          </div>
          <div className="pull-right" style={{position: 'absolute', top: 1, right: 0}}>
            <div style={{height: '24px'}}>
              <img onClick={this._onClickMore} className="hover-opacity-70 cursorlink" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/more.png" style={{float: 'right'}}/>
            </div>
            {clickedMoreButton}
          </div>
        </div>
        <div style={{display: 'inline-block', width: '15%', verticalAlign: 'top'}}>
          <span className="noto pull-right no-spacing" style={{fontSize: '13px'}}>{timeStamp(comment.created_at)}</span>
        </div>
      </div>
    );
  }
};
