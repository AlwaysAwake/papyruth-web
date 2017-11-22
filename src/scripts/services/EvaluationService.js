'use strict';

import _ from 'underscore';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class EvaluationService extends BaseService {

  getRecentEvals(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  getCourseEvals(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  getSingleEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.evaluation_id,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  getMyEvals(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/evaluations',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  checkEvalPossible(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/possible',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  writeEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  updateEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id,
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.PUT(payload);
  }

  deleteEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id,
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.DELETE(payload);
  }

  registerHashtags(params) {
    params['hashtags[]'] = params['hashtags'];
    params = _.omit(params, 'hashtags');
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.evaluation_id + '/hashtag',
      query: _.omit(params, 'evaluation_id'),
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  getRecommendedHashtags() {
    let payload = {
      url: ApiConstants.BASE_URL + 'hashtag',
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  voteEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  voteEvalCancel(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.DELETE(payload);
  }

  voteEvalUsers(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id + '/vote',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  reportEval(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'evaluations/' + params.id + '/report',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }
}

export default new EvaluationService();
