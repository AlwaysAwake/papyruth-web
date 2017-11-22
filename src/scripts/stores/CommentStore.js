import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

import { waitFor } from '../dispatchers/AppDispatcher'

class CommentStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._comments = {};
    this._myComments = [];
    this._writeObj = {};
    this._updateFlag = false;
    this._voteUsers = {};
    this._reportedCmtId = null;
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_COMMENTS_GET_SUCCESS:
        this.setWriteFlag({ flag: false, evaluationID: action.evaluation_id });
        this.setComments(action.evaluation_id, action.body.comments);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_MY_COMMENTS_SUCCESS:
        this._myComments = action.body.comments;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COMMENT_WRITE_SUCCESS:
        this.setWriteFlag({ flag: true, evaluationID: action.evaluation_id });
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COMMENT_VOTE_SUCCESS:
      case ActionTypes.REQUEST_COMMENT_VOTE_CANCEL_SUCCESS:
        this._error = null;
        break;

      case ActionTypes.REQUEST_COMMENT_VOTE_USERS_SUCCESS:
        this._voteUsers = action.body;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COMMENT_DELETE_SUCCESS:
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COMMENT_REPORT_SUCCESS:
        this._reportedCmtId = action.id;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_MY_COMMENTS_ERROR:
      case ActionTypes.REQUEST_COMMENTS_GET_ERROR:
      case ActionTypes.REQUEST_COMMENT_WRITE_ERROR:
      case ActionTypes.REQUEST_COMMENT_DELETE_ERROR:
      case ActionTypes.REQUEST_COMMENT_VOTE_ERROR:
      case ActionTypes.REQUEST_COMMENT_VOTE_CANCEL_ERROR:
      case ActionTypes.REQUEST_COMMENT_VOTE_USERS_ERROR:
      case ActionTypes.REQUEST_COMMENT_REPORT_ERROR:
        this._error = action.error;
        break;
    };
  }

  getComments(evaluationID) {
    return this._comments[evaluationID] ? this._comments[evaluationID] : {};
  }

  setComments(evaluationID, comments) {
    this._comments[evaluationID] = {};

    for (let i = 0; i < comments.length; i++) {
      this._comments[evaluationID][comments[i].id] = comments[i];
    }
  }

  getWriteFlag() {
    return this._writeObj;
  }

  setWriteFlag(obj) {
    this._writeObj = obj;
  }

  get myComments() {
    return this._myComments;
  }

  getVoteUsers() {
    return this._voteUsers;
  }

  getReportedCmtId() {
    return this._reportedCmtId;
  }
}

export default new CommentStore;
