'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import EvaluationService from '../services/EvaluationService';


export default {
  getRecentEvals: (params) => {
    let promise = EvaluationService.getRecentEvals(params);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_RECENT_EVALUATION,
      success: ActionTypes.REQUEST_RECENT_EVALUATION_SUCCESS,
      failure: ActionTypes.REQUEST_RECENT_EVALUATION_ERROR
    }, params);
  },

  getCourseEvals: (university_id, course_id, max_id) => {
    let with_comments = true;
    let limit = 10;
    let comments_limit = 3;
    let promise = EvaluationService.getCourseEvals({ university_id, course_id, limit, max_id, with_comments, comments_limit });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COURSE_EVALUATIONS,
      success: ActionTypes.REQUEST_COURSE_EVALUATIONS_SUCCESS,
      failure: ActionTypes.REQUEST_COURSE_EVALUATIONS_ERROR
    }, { university_id, course_id, max_id, with_comments, comments_limit });
  },

  getSingleEval: (evaluation_id) => {
    let promise = EvaluationService.getSingleEval({ evaluation_id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SINGLE_EVALUATION,
      success: ActionTypes.REQUEST_SINGLE_EVALUATION_SUCCESS,
      failure: ActionTypes.REQUEST_SINGLE_EVALUATION_ERROR
    }, { evaluation_id });
  },

  getMyEvals: (page) => {
    let promise = EvaluationService.getMyEvals({ page });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_MY_EVALUATIONS,
      success: ActionTypes.REQUEST_MY_EVALUATIONS_SUCCESS,
      failure: ActionTypes.REQUEST_MY_EVALUATION_ERROR
    }, { page });
  },

  checkEvalPossible: (course_id) => {
    let promise = EvaluationService.checkEvalPossible({ course_id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE,
      success: ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE_SUCCESS,
      failure: ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE_ERROR
    }, { course_id });
  },

  writeEval: (evalData) => {
    let promise = EvaluationService.writeEval(evalData);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_WRITE,
      success: ActionTypes.REQUEST_EVALUATION_WRITE_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_WRITE_ERROR
    }, evalData);
  },

  updateEval: (evalData) => {
    let promise = EvaluationService.updateEval(evalData);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_UPDATE,
      success: ActionTypes.REQUEST_EVALUATION_UPDATE_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_UPDATE_ERROR
    }, evalData);
  },

  deleteEval: (id) => {
    let promise = EvaluationService.deleteEval({ id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_DELETE,
      success: ActionTypes.REQUEST_EVALUATION_DELETE_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_DELETE_ERROR
    }, { id });
  },

  registerHashtags: (evaluation_id, hashtags) => {
    let promise = EvaluationService.registerHashtags({ evaluation_id, hashtags });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_REGISTER_HASHTAGS,
      success: ActionTypes.REQUEST_REGISTER_HASHTAGS_SUCCESS,
      failure: ActionTypes.REQUEST_REGISTER_HASHTAGS_ERROR
    }, { hashtags, evaluation_id });
  },

  getRecommendedHashtags: () => {
    let promise = EvaluationService.getRecommendedHashtags();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_RECOMMENDED_HASHTAGS,
      success: ActionTypes.REQUEST_RECOMMENDED_HASHTAGS_SUCCESS,
      failure: ActionTypes.REQUEST_RECOMMENDED_HASHTAGS_ERROR
    });
  },

  voteEval: (id, up) => {
    let promise = EvaluationService.voteEval({ id, up });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_VOTE,
      success: ActionTypes.REQUEST_EVALUATION_VOTE_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_VOTE_ERROR
    }, { id, up });
  },

  voteEvalCancel: (id) => {
    let promise = EvaluationService.voteEvalCancel({ id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_VOTE_CANCEL,
      success: ActionTypes.REQUEST_EVALUATION_VOTE_CANCEL_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_VOTE_CANCEL_ERROR
    }, { id });
  },

  voteEvalUsers: ( id ) => {
    let promise = EvaluationService.voteEvalUsers({ id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_VOTE_USERS,
      success: ActionTypes.REQUEST_EVALUATION_VOTE_USERS_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_VOTE_USERS_ERROR
    }, { id });
  },

  reportEval: (id, content) => {
    let promise = EvaluationService.reportEval({ id, body: content });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_EVALUATION_REPORT,
      success: ActionTypes.REQUEST_EVALUATION_REPORT_SUCCESS,
      failure: ActionTypes.REQUEST_EVALUATION_REPORT_ERROR
    }, { id, content });
  }
};
