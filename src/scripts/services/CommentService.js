'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class CommentService extends BaseService {

  getComments(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  getMyComments(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/comments',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  writeComment(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  deleteComment(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments/' + params.id,
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.DELETE(payload);
  }

  voteComment(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments/' + params.comment_id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  voteCommentCancel(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments/' + params.comment_id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.DELETE(payload);
  }

  voteCommentUsers(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments/' + params.id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  reportComment(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'comments/' + params.id + '/report',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }
}

export default new CommentService();
