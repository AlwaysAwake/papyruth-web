'use strict';

import React from 'react';
import history from '../../history';

import CourseActionCreators from '../../actions/CourseActionCreators';
import EvaluationActionCreators from '../../actions/EvaluationActionCreators';

import CourseStore from '../../stores/CourseStore';
import EvaluationStore from '../../stores/EvaluationStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;

import EvaluationWriteForm from './EvaluationWriteForm';


export default class UpdateEvaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evalData: {
        course_id: this.props.params.course_id,
        point_overall: 5,
        point_gpa_satisfaction: 5,
        point_easiness: 5,
        point_clarity: 5,
        body: "",
        hashtags: []
      }
    };
    CourseActionCreators.getCourseDetail(this.props.params.course_id);
  }

  componentWillMount() {
    this.courseListener = this._onCourseInfoLoaded.bind(this);
    CourseStore.addChangeListener(this.courseListener);
    this.evalListener = this._onEvalStoreUpdated.bind(this);
    EvaluationStore.addChangeListener(this.evalListener);
    EvaluationActionCreators.getSingleEval(this.props.params.evaluation_id);
  }

  componentWillUnmount() {
    CourseStore.removeChangeListener(this.courseListener);
    EvaluationStore.removeChangeListener(this.evalListener);
  }

  _onCourseInfoLoaded() {
    this.setState({ targetCourse: CourseStore.getCourseDetail() });
  }

  _requestSubmit(evalData, hashtags) {
    EvaluationActionCreators.updateEval(evalData);
    EvaluationActionCreators.registerHashtags(this.props.params.evaluation_id, hashtags);
  }

  _onEvalStoreUpdated() {
    if (EvaluationStore.actionType === ActionTypes.REQUEST_SINGLE_EVALUATION_SUCCESS) {
      this.setState({ evalData: EvaluationStore.getSingleEval() });
      // this.setState({ hashtags: EvaluationStore.getEvaluationHashtags() });
    } else if (EvaluationStore.actionType === ActionTypes.REQUEST_EVALUATION_UPDATE_SUCCESS) {
      msgEmitter.success(validationMsg.UPDATE_EVALUATION_SUCCESS);
      history.replaceState(null, '/course/' + this.props.params.course_id);
    }
  }

  render() {
    return (
      <EvaluationWriteForm
        title="강의 평가 수정하기"
        targetCourse={this.state.targetCourse}
        course_id={this.props.params.course_id}
        searchEnabled={false}
        requestSubmit={this._requestSubmit.bind(this)}
        evalData={this.state.evalData} />
    );
  }
};
