'use strict';

import React from 'react';

import _ from 'underscore';

import CommentActionCreators from '../../actions/CommentActionCreators';

import CommentStore from '../../stores/CommentStore';

import CommentItem from './CommentItem'

import ViewConstants from '../../constants/ViewConstants';
const commentsPerRequest = ViewConstants.Comment.commentsPerRequest;

export default class CommentsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this._allComments = {};
    let initialComments = {};
    let minID = 0;
    let maxID = 0;

    for (let i = 0; i < this.props.comments.length ; i++ ) {
      if (i === 0) minID = this.props.comments[i].id;
      else if (i === this.props.comments.length - 1) maxID = this.props.comments[i].id;
      initialComments[this.props.comments[i].id] = this.props.comments[i];
    }

    this._onFocusOutMore = this._onFocusOutMore.bind(this);
    this.state = {
      comments: initialComments,
      newComment: "",
      minID: minID,
      maxID: maxID,
      writeFlag: false,
      lastComment: false
    };
  }

  componentDidMount() {
    this.changeListener = this._onCommentsLoad.bind(this);
    CommentStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this.changeListener);
  }

  componentWillReceiveProps(nextProps) {
    let initialComments = {};
    let minID = 0;
    let maxID = 0;

    if (nextProps.evaluation.id !== this.props.evaluation.id) {
      for(let i = 0; i < nextProps.comments.length ; i++ ) {
        if (i === 0) minID = nextProps.comments[i].id;
        else if (i === nextProps.comments.length - 1) maxID = nextProps.comments[i].id;
        initialComments[nextProps.comments[i].id] = nextProps.comments[i];
      }

      this.setState({
        comments: initialComments,
        newComment: "",
        minID: minID,
        maxID: maxID,
        writeFlag: false,
        lastComment: false
      });
    }
  }

  _onCommentsLoad() {
    if (CommentStore.getWriteFlag().flag === true && CommentStore.getWriteFlag().evaluationID === this.props.evaluation.id)
      CommentActionCreators.getComments({ evaluation_id: this.props.evaluation.id, since_id: this.state.comments ? this.state.maxID : 0});

    else if (CommentStore.getWriteFlag().flag === false && CommentStore.getWriteFlag().evaluationID === this.props.evaluation.id) {
      let comments = this.state.comments;
      let newComments = CommentStore.getComments(this.props.evaluation.id);

      if (Object.keys(newComments).length > 0) {
        comments = Object.assign(comments, newComments);
        let minID = Object.keys(comments)[0];
        let maxID = Object.keys(comments)[Object.keys(comments).length - 1];

        if (Object.keys(newComments).length < commentsPerRequest && this.state.writeFlag)
          this.setState({ lastComment: true });

        this.setState({ comments, minID, maxID, writeFlag: false });
      } else {
        this.setState({ lastComment: true });
      }
    }
  }

  _onChange(e) {
    this.setState({newComment: e.target.value});
  }

  _writeComment(evalID, e) {
    if(e.keyCode === 13 || e.type === 'click') {
      CommentActionCreators.writeComment(evalID, this.state.newComment);
      this.setState({newComment: ""});
    }
  }

  _deleteComment(id) {
    CommentActionCreators.deleteComment(id);
    this.setState({comments: _.omit(this.state.comments, id)});
  }

  _toggleComments() {
    if (this.state.lastComment) {
      let sliceCommentsID = Object.keys(this.state.comments).reverse().slice(0,3);
      let sliceComments = {};
      let minID = sliceCommentsID[sliceCommentsID.length - 1];
      let maxID = sliceCommentsID[0];

      for (let i = 0; i < sliceCommentsID.length; i++) {
        sliceComments[sliceCommentsID[i]] = this.state.comments[sliceCommentsID[i]];
      }

      this.setState({ comments: sliceComments, maxID: maxID, minID: minID, lastComment: false });
    }

    else {
      CommentActionCreators.getComments({ evaluation_id : this.props.evaluation.id, max_id : this.state.minID - 1, limit: commentsPerRequest });
    }
  }

  _upVote(evaluationID, commentID, flag) {
    let comments = this.state.comments;

    if (flag === 1) {
      comments[commentID].up_vote_count--;
      comments[commentID].request_user_vote = undefined;
      CommentActionCreators.voteCommentCancel(evaluationID, commentID);
    }
    else {
      if (comments[commentID].request_user_vote == 0)
        comments[commentID].down_vote_count--;

      comments[commentID].up_vote_count++;
      comments[commentID].request_user_vote = 1;

      CommentActionCreators.voteComment(evaluationID, commentID, true);
    }

    this.setState({ comments });
  }

  _downVote(evaluationID, commentID, flag) {
    let comments = this.state.comments;

    if (flag === 0) {
      comments[commentID].down_vote_count--;
      comments[commentID].request_user_vote = undefined;
      CommentActionCreators.voteCommentCancel(evaluationID, commentID);
    }
    else {
      if (comments[commentID].request_user_vote == 1)
        comments[commentID].up_vote_count--;

      comments[commentID].down_vote_count++;
      comments[commentID].request_user_vote = 0;

      CommentActionCreators.voteComment(evaluationID, commentID, false);
    }

    this.setState({ comments });
  }

  _upVoteUsers(commentID) {
    CommentActionCreators.voteCommentUsers(commentID);
  }

  _downVoteUsers(commentID) {
    CommentActionCreators.voteCommentUsers(commentID);
  }

  _onFocusOutMore(e) {
    this.props.onClickMore(-1, '');
    e.stopPropagation();
  }
  render() {
    let cmts = "";
    let moreButton = "";

    let commentsKeyList = this.state.comments ? Object.keys(this.state.comments) : [];

    cmts = this.state.comments ? commentsKeyList.map((id) => {
      return (
        <CommentItem key={id}
          comment={this.state.comments[id]}
          deleteComment={this._deleteComment.bind(this)}
          upVote={this._upVote.bind(this)}
          downVote={this._downVote.bind(this)}
          upVoteUsers={this._upVoteUsers.bind(this)}
          downVoteUsers={this._downVoteUsers.bind(this)}
          onClickMore={this.props.onClickMore}
          clickedId={this.props.clickedId}
          clickedItem={this.props.clickedItem} />
      );
    }) : "";

    if (this.state.lastComment)
      moreButton = <span className="noto" style={{fontSize: "13px", fontWeight: "300", color: "#adadad"}}>댓글 감추기</span>;
    else
      moreButton = <span className="noto" style={{fontSize: "13px", fontWeight: "300", color: "#adadad"}}>댓글 더 보기</span>;

    return (
      <div className="col-xs-12 comments-wrap" evaluationID={this.props.evaluation.id}>
        <div className="post default" style={{borderStyle: "solid", borderColor: "#ececec", borderWidth: "1px", borderRadius: "12px", backgroundColor: "#f7f7f7", marginLeft: '130px', paddingRight: '15px', paddingLeft: '15px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center'}}>
          <a onClick={this._toggleComments.bind(this)} className="comments-more cursorlink">
            {moreButton}
          </a>
        </div>
        <div onClick={this._onFocusOutMore} className="comments-body-wrap" evaluationID={this.props.evaluation.id}>
          {cmts}
        </div>
        <div className="post default" style={{marginLeft: '130px', paddingLeft: '15px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff', textAlign: 'left'}}>
          <button onClick={this._writeComment.bind(this, this.props.evaluation.id)} className="btn btn-default pull-right" style={{backgroundColor: '#adadad', display: 'inline', width: '15%', margin: 0}}>
            <span className="noto" style={{width: '50%', fontSize: '14px'}}>댓글쓰기</span>
          </button>
          <input type="text" value={this.state.newComment} className="form-control pull-right" placeholder="댓글을 입력해주세요." name="comment" onChange={this._onChange.bind(this)} onKeyDown={this._writeComment.bind(this, this.props.evaluation.id)} style={{display: 'inline', width: '80%', marginRight: '5px', borderStyle: 'solid', borderColor: '#adadad', borderWidth: '1px', borderRadius: '4px'}}/>
        </div>
      </div>
    );
  }
};
