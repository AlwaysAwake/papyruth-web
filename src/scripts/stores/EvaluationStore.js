import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class EvaluationStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._newEvaluationId = null;
    this._writeEvalPossible = null;
    this._writtenEvalId = null;
    this._reportedEvalId = null;
    this._recentEvals = [];
    this._courseEvals = {};
    this._singleEval = {};
    this._recommendedHashtags = [];
    this._myEvals = [];
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_RECENT_EVALUATION_SUCCESS:
        this.setRecentEvaluations(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COURSE_EVALUATIONS_SUCCESS:
        this.setUpdateFlag(false);
        this.setCourseEvaluations(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SINGLE_EVALUATION_SUCCESS:
        this.setSingleEval(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_MY_EVALUATIONS_SUCCESS:
        this.setMyEvaluations(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_RECOMMENDED_HASHTAGS_SUCCESS:
        this.setRecommendedHashtags(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE_SUCCESS:
        this.setWriteEvalPossible(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_EVALUATION_WRITE_SUCCESS:
        this.setNewEvaluationId(action.body);
        this.emitChange();
        this._error = null;
        break;

      case ActionTypes.REQUEST_EVALUATION_UPDATE_SUCCESS:
      case ActionTypes.REQUEST_EVALUATION_DELETE_SUCCESS:
      case ActionTypes.REQUEST_REGISTER_HASHTAGS_SUCCESS:
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_EVALUATION_REPORT_SUCCESS:
        this._reportedEvalId = action.id;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_EVALUATION_VOTE_SUCCESS:
      case ActionTypes.REQUEST_EVALUATION_VOTE_CANCEL_SUCCESS:
        this.setUpDownCount(action.id, action.body);
        this.setUpdateFlag(true);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_RECENT_EVALUATION_ERROR:
      case ActionTypes.REQUEST_COURSE_EVALUATIONS_ERROR:
      case ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE_ERROR:
      case ActionTypes.REQUEST_EVALUATION_WRITE_ERROR:
      case ActionTypes.REQUEST_EVALUATION_UPDATE_ERROR:
      case ActionTypes.REQUEST_EVALUATION_DELETE_ERROR:
      case ActionTypes.REQUEST_REGISTER_HASHTAGS_ERROR:
      case ActionTypes.REQUEST_MY_EVALUATIONS_ERROR:
      case ActionTypes.REQUEST_EVALUATION_VOTE_ERROR:
      case ActionTypes.REQUEST_EVALUATION_VOTE_CANCEL_ERROR:
      case ActionTypes.REQUEST_EVALUATION_VOTE_USERS_ERROR:
      case ActionTypes.REQUEST_EVALUATION_REPORT_ERROR:
        this._error = action.error;
        this.emitChange();
        break;
    };
  }

  get recentEvaluations() {
    return this._recentEvals;
  }

  setRecentEvaluations(evaluations) {
    this._recentEvals = evaluations.evaluations;
  }

  setSingleEval(body) {
    this._singleEval = body.evaluation;
  }

  getSingleEval() {
    return this._singleEval;
  }

  getCourseEvaluations() {
    return this._courseEvals ? this._courseEvals : {};
  }

  setCourseEvaluations(evaluations) {
    this._courseEvals = {};

    for (let i = 0; i < evaluations.evaluations.length; i++) {
      this._courseEvals[evaluations.evaluations[i].id] = evaluations.evaluations[i];
    }
  }

  setNewEvaluationId(body) {
    this._newEvaluationId = body.evaluation_id;
  }

  getNewEvaluationId() {
    return this._newEvaluationId;
  }

  setRecommendedHashtags(body) {
    this._recommendedHashtags = body.hashtags;
  }

  getRecommendedHashtags() {
    return this._recommendedHashtags;
  }

  setWriteEvalPossible(body) {
    this._writeEvalPossible = body.success;
    if (!this._writeEvalPossible) this._writtenEvalId = body.evaluation_id;
  }

  getWriteEvalPossible() {
    return this._writeEvalPossible;
  }

  getWrittenEvalId() {
    return this._writtenEvalId;
  }

  getUpdateFlag() {
    return this._updateFlag;
  }

  setUpdateFlag(flag) {
    this._updateFlag = flag;
  }

  setUpDownCount(id, counts) {
    this._courseEvals[id].up_vote_count = counts.up_vote_count;
    this._courseEvals[id].down_vote_count = counts.down_vote_count;
  }

  get myEvals() {
    return this._myEvals;
  }

  setMyEvaluations(evaluations) {
    this._myEvals = evaluations.evaluations;
  }

  getReportedEvalId() {
    return this._reportedEvalId;
  }
}

export default new EvaluationStore;
