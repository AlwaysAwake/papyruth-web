'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import history from '../../history';

import AuthActionCreators from '../../actions/AuthActionCreators';
import CourseActionCreators from '../../actions/CourseActionCreators';
import EvaluationActionCreators from '../../actions/EvaluationActionCreators';

import AuthStore from '../../stores/AuthStore';
import CourseStore from '../../stores/CourseStore';
import EvaluationStore from '../../stores/EvaluationStore';
import FavoriteCourseStore from '../../stores/FavoriteCourseStore';

import CourseScoreBoardWrapper from './CourseScoreBoardWrapper';
import EvaluationsWrapper from './EvaluationsWrapper';
import TagsWrapper from './TagsWrapper';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;
const courseCategory = ViewConstants.Course.courseCategory;


export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      loading: true,
      isEvalPossible: true
    };
    if (AuthStore.user.confirmed) {
      let user = AuthStore.user;
      let mandatory_evaluation_count = user.mandatory_evaluation_count;
      if (mandatory_evaluation_count > 0) {
        history.replaceState(null, '/evaluation/required/' + mandatory_evaluation_count);
      }
      if (user.confirmed !== true) {
        history.replaceState(null, '/user/auth/email');
      }
    } else {
      AuthActionCreators.fetchUserInfo();
    }
  }

  componentDidMount() {
    CourseActionCreators.getCourseDetail(this.props.params.courseID);
    EvaluationActionCreators.checkEvalPossible(this.props.params.courseID);
    this.authListener = this._onUserInfoFetched.bind(this);
    AuthStore.addChangeListener(this.authListener);
    this.courseListener = this._onCourseDetailLoad.bind(this);
    CourseStore.addChangeListener(this.courseListener);
    this.evalListener = this._onCheckEvalExists.bind(this);
    EvaluationStore.addChangeListener(this.evalListener);
    this.favoriteListener = this._onFavoriteCourseUpdated.bind(this);
    FavoriteCourseStore.addChangeListener(this.favoriteListener);
    this.deleteEvalListener = this._onEvaluationDeleted.bind(this);
    EvaluationStore.addChangeListener(this.deleteEvalListener);
  }

  componentWillReceiveProps(nextProps) {
    CourseActionCreators.getCourseDetail(nextProps.params.courseID);
    EvaluationActionCreators.checkEvalPossible(nextProps.params.courseID);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.authListener);
    CourseStore.removeChangeListener(this.courseListener);
    EvaluationStore.removeChangeListener(this.evalListener);
    FavoriteCourseStore.removeChangeListener(this.favoriteListener);
    EvaluationStore.removeChangeListener(this.deleteEvalListener);
  }

  _onUserInfoFetched() {
    if (AuthStore.actionType === ActionTypes.FETCH_USER_INFORMATIONS_SUCCESS) {
      let user = AuthStore.user;
      let mandatory_evaluation_count = user.mandatory_evaluation_count;
      if (mandatory_evaluation_count > 0) {
        history.replaceState(null, '/evaluation/required/' + mandatory_evaluation_count);
      }
      if (user.confirmed !== true) {
        history.replaceState(null, '/user/auth/email');
      }
    }
  }

  _getCourseDetailState() {
    return { course: CourseStore.getCourseDetail(), loading: true };
  }

  _onCourseDetailLoad() {
    let courseState = this._getCourseDetailState();
    this.setState(courseState);
  }

  _onCheckEvalExists() {
    this.setState({ isEvalPossible: EvaluationStore.getWriteEvalPossible() });
  }

  _setFavoriteCourse() {
    let favorite = true;
    CourseActionCreators.setFavoriteCourse(this.state.course, favorite);
  }

  _deleteEval() {
    let evalId = this.state.isEvalPossible ? -1 : EvaluationStore.getWrittenEvalId();
    EvaluationActionCreators.deleteEval(evalId);
  }

  _onEvaluationDeleted() {
    if (EvaluationStore.actionType === ActionTypes.REQUEST_EVALUATION_DELETE_SUCCESS) {
      msgEmitter.success(validationMsg.DELETE_EVALUATION_SUCCESS);
      history.pushState(null, '/');
      history.pushState(null, '/course/' + this.props.params.courseID);
    }
  }

  _onFavoriteCourseUpdated() {
    if (FavoriteCourseStore.actionType === ActionTypes.REQUEST_SET_FAVORITE_COURSE_SUCCESS) {
      if (FavoriteCourseStore.getResult()) {
        msgEmitter.success(validationMsg.FAVORITE_COURSE_ADD_SUCCESS);
        CourseActionCreators.getCourseDetail(this.props.params.courseID);
      } else if (FavoriteCourseStore.getResult() === false && this.props.params.courseID == FavoriteCourseStore.isCourseViewNeedsUpdate()) {
        CourseActionCreators.getCourseDetail(this.props.params.courseID);
      }
    }
  }

  render() {
    let course = this.state.course;
    let evalButton
      = <Link to={`/evaluation/${this.state.isEvalPossible ? "write" : "update"}/${course ? course.id : ''}/${this.state.isEvalPossible ? "" : EvaluationStore.getWrittenEvalId()}`}>
          <button className="btn-submit pull-right course-link-btn" style={{width: "100px"}}>
            <span className="evaluation-submit-text noto">{"강의평가 " + (this.state.isEvalPossible ? "쓰기" : "수정")}</span>
          </button>
        </Link>;
    let favoriteButton = course.is_favorite
      ? <button className="btn-normal pull-right course-link-btn" style={{width: "100px"}}>
          <span className="evaluation-submit-text noto">관심강의</span>
        </button>
      : <button onClick={this._setFavoriteCourse.bind(this)} className="btn-submit pull-right course-link-btn" style={{width: "100px"}}>
          <span className="evaluation-submit-text noto">관심강의 등록</span>
        </button>;

    return (
      <div className="panel panel-default border-normal">
        <div className="panel panel-body">
          <div className="row" style={{paddingLeft: "30px", marginBottom: "30px"}}>
            <span className="noto" style={{fontSize: "30px", fontWeight: "bold", color: "#333"}}>{course.name}</span>
            <div className="course-category-box" style={{ position: "absolute", marginTop: "9px", marginLeft: "15px", borderColor: _.has(course, "category") ? courseCategory[course.category].color : "#000" }}>
              <span className="noto course-category-text" style={{ color: _.has(course, "category") ? courseCategory[course.category].color : "#000" }}>{ _.has(course, "category") ? courseCategory[course.category].name : ""}</span>
            </div>
            {favoriteButton}
            {this.state.isEvalPossible? evalButton : ""}
          </div>
          <div className="row">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-xs-2" style={{marginTop: '-20px'}}>
                  <img src={course.professor_photo_url} style={{width: "85px", borderRadius: '50%'}}/>
                  <h4 className="noto" style={{ width: "85px", marginTop: "10px", wordWrap: "break-word", wordBreak: "break-all" }}>{course.professor_name ? course.professor_name + " 교수님" : ""}</h4>
                </div>
                <CourseScoreBoardWrapper course={course} />
              </div>
            </div>
          </div>
          <TagsWrapper hashtags={course.hashtags}/>
        </div>
        <EvaluationsWrapper universityId={AuthStore.user.university_id} courseID={this.props.params.courseID} deleteEval={this._deleteEval.bind(this)} />
      </div>
    );
  }
};
