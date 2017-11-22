'use strict';

import React from 'react';
import history from '../../history';

import CourseActionCreators from '../../actions/CourseActionCreators';
import EvaluationActionCreators from '../../actions/EvaluationActionCreators';
import AuthActionCreators from '../../actions/AuthActionCreators';

import AuthStore from '../../stores/AuthStore';
import CourseStore from '../../stores/CourseStore';
import EvaluationStore from '../../stores/EvaluationStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;

import EvaluationWriteForm from './EvaluationWriteForm';


export default class CreateEvaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      targetCourseId: '',
      isWaiting: false
    };
    if (this.props.params.course_id) {
      CourseActionCreators.getCourseDetail(this.props.params.course_id);
    }
  }

  componentWillMount() {
    if (this.props.params.course_id) {
      this.courseListener = this._onCourseInfoLoaded.bind(this);
      CourseStore.addChangeListener(this.courseListener);
    }
    this.evalListener = this._onEvalStoreUpdated.bind(this);
    EvaluationStore.addChangeListener(this.evalListener);
    this.authListener = this._onAuthStoreUpdated.bind(this);
    AuthStore.addChangeListener(this.authListener);
  }

  componentWillUnmount() {
    if (this.props.params.course_id) {
      CourseStore.removeChangeListener(this.courseListener);
    }
    EvaluationStore.removeChangeListener(this.evalListener);
    AuthStore.removeChangeListener(this.authListener);
  }

  _onCourseInfoLoaded() {
    this.setState({ targetCourse: CourseStore.getCourseDetail() });
  }

  _requestSubmit(evalData, hashtags) {
    if (!this.state.isWaiting) {
      EvaluationActionCreators.writeEval(evalData);
      if (hashtags.length !== 0) {
        this.setState({ targetCourseId: evalData.course_id, hashtags: hashtags, isWaiting: true });
      } else {
        this.setState({ targetCourseId: evalData.course_id, isWaiting: true });
      }
    }
  }

  _onEvalStoreUpdated() {
    if (EvaluationStore.actionType === ActionTypes.REQUEST_EVALUATION_WRITE_SUCCESS) {
      if (this.state.hashtags.length !== 0) {
        EvaluationActionCreators.registerHashtags(EvaluationStore.getNewEvaluationId(), this.state.hashtags);
      } else {
        msgEmitter.success(validationMsg.WRITE_EVALUATION_SUCCESS);
        AuthActionCreators.fetchUserInfo();
      }
    } else if (EvaluationStore.actionType === ActionTypes.REQUEST_REGISTER_HASHTAGS_SUCCESS) {
      msgEmitter.success(validationMsg.WRITE_EVALUATION_SUCCESS);
      AuthActionCreators.fetchUserInfo();
    }
  }

  _onAuthStoreUpdated() {
    if (AuthStore.actionType === ActionTypes.FETCH_USER_INFORMATIONS_SUCCESS) {
      history.replaceState(null, '/course/' + this.state.targetCourseId);
    }
  }

  render() {
    return (
      <EvaluationWriteForm
        title="강의 평가하기"
        targetCourse={this.state.targetCourse}
        course_id={this.props.params.course_id}
        searchEnabled={true}
        requestSubmit={this._requestSubmit.bind(this)} />
    );
  }
};
