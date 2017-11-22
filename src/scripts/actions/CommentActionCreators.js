'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import CommentService from '../services/CommentService';


export default {
  getComments: ( params ) => {
    let promise = CommentService.getComments(params);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENTS_GET,
      success: ActionTypes.REQUEST_COMMENTS_GET_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENTS_GET_ERROR
    }, params);
  },

  getMyComments: (page) => {
    let promise = CommentService.getMyComments({ page });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_MY_COMMENTS,
      success: ActionTypes.REQUEST_MY_COMMENTS_SUCCESS,
      failure: ActionTypes.REQUEST_MY_COMMENTS_ERROR
    }, { page });
  },

  writeComment: ( evaluation_id, body ) => {
    let promise = CommentService.writeComment({ evaluation_id, body });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_WRITE,
      success: ActionTypes.REQUEST_COMMENT_WRITE_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_WRITE_ERROR
    }, { evaluation_id, body });
  },

  deleteComment: (id) => {
    let promise = CommentService.deleteComment({ id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_DELETE,
      success: ActionTypes.REQUEST_COMMENT_DELETE_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_DELETE_ERROR
    }, { id });
  },

  voteComment: ( evaluation_id, comment_id, up ) => {
    let promise = CommentService.voteComment({ comment_id, up });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_VOTE,
      success: ActionTypes.REQUEST_COMMENT_VOTE_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_VOTE_VOTE_ERROR
    }, { evaluation_id, comment_id, up });
  },

  voteCommentCancel: ( evaluation_id, comment_id ) => {
    let promise = CommentService.voteCommentCancel({ comment_id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_VOTE_CANCEL,
      success: ActionTypes.REQUEST_COMMENT_VOTE_CANCEL_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_VOTE_CANCEL_ERROR
    }, { evaluation_id, comment_id });
  },

  voteCommentUsers: ( id ) => {
    let promise = CommentService.voteCommentUsers({ id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_VOTE_USERS,
      success: ActionTypes.REQUEST_COMMENT_VOTE_USERS_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_VOTE_USERS_ERROR
    }, { id });
  },

  reportComment: (id, content) => {
    let promise = CommentService.reportComment({ id, body: content });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COMMENT_REPORT,
      success: ActionTypes.REQUEST_COMMENT_REPORT_SUCCESS,
      failure: ActionTypes.REQUEST_COMMENT_REPORT_ERROR
    }, { id, content });
  }
};
