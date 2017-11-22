'use strict';

import React from 'react';
import Update from 'react-addons-update';
import IconRating from 'react-icon-rating';
import ReactSlider from 'react-slider';
import _ from 'underscore';

import HashtagList from './HashtagList';
import SearchedCourseList from './SearchedCourseList';
import SearchedCourseItem from './SearchedCourseItem';
import LoadingComponent from '../Common/LoadingComponent';

import EvaluationActionCreators from '../../actions/EvaluationActionCreators';
import SearchActionCreators from '../../actions/SearchActionCreators';

import EvaluationStore from '../../stores/EvaluationStore';
import CourseStore from '../../stores/CourseStore';
import AuthStore from '../../stores/AuthStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const formItems = ViewConstants.Evaluation.EvaluationWriteForm.formItems;
const formState = ViewConstants.Evaluation.EvaluationWriteForm.formState;
const initialFormState = ViewConstants.Evaluation.EvaluationWriteForm.initialFormState;
const completeFormState = ViewConstants.Evaluation.EvaluationWriteForm.completeFormState;
const initialEvalValue = ViewConstants.Evaluation.EvaluationWriteForm.initialEvalValue;
const itemPerRequest = ViewConstants.Evaluation.EvaluationWriteForm.itemPerRequest;
const courseCategory = ViewConstants.Evaluation.searchedCourseList.courseCategory;
const validationMsg = ViewConstants.validationMessages;


export default class EvaluationWriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: this.props.course_id || -1,
      evalData: this.props.evalData || initialEvalValue,
      formState: this.props.evalData ? completeFormState : initialFormState,
      targetCourse: this.props.targetCourse || {},
      query: '',
      searchedCourses: [],
      searchListVisibility: false,
      hashtags: this.props.evalData ? this.props.evalData.hashtags : [],
      recommendedHashtags: [],
      hashtagInputValue: '',
      searchPage: 1,
      searchEnd: false,
      searching: false,
      loading: false,
    };
    EvaluationActionCreators.getRecommendedHashtags();
  }

  componentWillMount() {
    this.delayedSearch = _.debounce(this._triggerSearch, 500);
    this.evalStoreListener = this._onEvalStoreUpdated.bind(this);
    EvaluationStore.addChangeListener(this.evalStoreListener);
    this.courseStoreListener = this._onSearchCompleted.bind(this);
    CourseStore.addChangeListener(this.courseStoreListener);
    this.scrollListener = this._onScrollSearchResult.bind(this);
    document.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    EvaluationStore.removeChangeListener(this.evalStoreListener);
    CourseStore.removeChangeListener(this.courseStoreListener);
    document.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(this.state.targetCourse))
      this.setState({ targetCourse: nextProps.targetCourse });
    if (nextProps.evalData && nextProps.evalData.id) {
      // Fetch complete from server
      this.setState({ evalData: nextProps.evalData, hashtags: nextProps.evalData.hashtags });
    }
  }

  _onEvalStoreUpdated() {
    if (EvaluationStore.actionType === ActionTypes.REQUEST_RECOMMENDED_HASHTAGS_SUCCESS) {
      this.setState({ recommendedHashtags: EvaluationStore.getRecommendedHashtags() });
    } else if (EvaluationStore.actionType === ActionTypes.REQUEST_CHECK_EVAL_POSSIBLE_SUCCESS && !EvaluationStore.getWriteEvalPossible()) {
      msgEmitter.error(validationMsg.EVALUATION_ALREADY_EXISTS);
      this.setState({
        query: '',
        course_id: -1,
        targetCourse: {},
        searchedCourses: [],
        searchListVisibility: false,
        loading: false,
        searching: false,
        searchPage: 1,
        searchEnd: false
      });
    }
  }

  _onSearchCompleted() {
    if (CourseStore.actionType === ActionTypes.REQUEST_SEARCH_COURSE_FOR_EVAL_SUCCESS) {
      if (this.state.searchPage === 1)
        this.setState({ searchedCourses: CourseStore.getSearchResultForEval().courses, searching: false });
      else if (CourseStore.getSearchResultForEval().courses.length === 0)
        this.setState({ searchEnd : true, loading: false });
      else
        this.setState({ searchedCourses: this.state.searchedCourses.concat(CourseStore.getSearchResultForEval().courses), loading: false });
    }
  }

  _onChangeQuery(e) {
    let query = e.target.value;
    this.setState({ query: query });

    if (query !== '') {
      this.setState({ searchPage: 1, searchEnd: false });
      this.delayedSearch(query);
    } else {
      this.setState({ searchedCourses: [], searchPage: 1, searchEnd: false, loading: false, searching: false });
    }
  }

  _triggerSearch(query) {
    if (this.state.query !== '') {
      this.setState({ searching: true });
      SearchActionCreators.searchCourseForEval(AuthStore.user.university_id, query, 1, itemPerRequest);
    }
  }

  _onScrollSearchResult() {
    let scrollableDom = document.getElementById("search-input");

    if (scrollableDom.clientHeight < scrollableDom.scrollHeight && !this.state.searchEnd && !this.state.loading ) {
      let scrollPercent = (scrollableDom.clientHeight + scrollableDom.scrollTop) / scrollableDom.scrollHeight * 100;

      if (scrollPercent >= 100) {
        let nextPage = this.state.searchPage + 1;

        this.setState({ loading: true, searchPage: nextPage });
        SearchActionCreators.searchCourseForEval(AuthStore.user.university_id, this.state.query, nextPage, itemPerRequest);
      }
    }
  }

  _onClickSearchInput() {
    if (this.state.searchListVisibility === false) {
      this._onFocusSearchInput();
      setTimeout(() => { this.refs.queryInput.focus(); }, 1);
    }
  }

  _onFocusSearchInput() {
    this.setState({ query: '', searchedCourses: [], searchListVisibility: true });
  }

  _onFocusOutSearchInput() {
    this.setState({ query: '', searchedCourses: [], searchListVisibility: false, loading: false, searching: false });
  }

  _onClickSearchedItem(item) {
    this.setState({
      targetCourse: item,
      searchListVisibility: false,
      loading: false,
      searching: false,
      course_id: item.id
    }, () => {
      EvaluationActionCreators.checkEvalPossible(item.id);
    });
  }

  _onChangeField(field, point) {
    let newState = Update(this.state, {
      evalData: { [field]: { $set: point } },
      formState: { [field]: { $set: 'complete' } }
    });
    this.setState(newState);
  }

  _onChangeBody(e) {
    let body = e.target.value;
    let newState = Update(this.state, {
      evalData: { body: { $set: body } },
      formState: { body: { $set: body === '' ? 'initial' : 'complete' } }
    });
    this.setState(newState);
  }

  _onChangeHashtagInput(e) {
    let value = e.target.value;
    this.setState({ hashtagInputValue: value });
  }

  _onClickRecommendedHashtags(item, e) {
    e.preventDefault();
    let hashtags = this.state.hashtags;
    if (hashtags.indexOf(item) === -1) {
      hashtags.push(item);
      this.setState({ hashtags: hashtags, hashtagInputValue: '' });
    } else {
      msgEmitter.error(validationMsg.HASHTAGS_CANNOT_BE_DUPLICATED);
    }
    e.stopPropagation();
  }

  _onAddHashtags(e) {
    if (e.keyCode === 13) {
      let registerItem = e.target.value;
      if (registerItem.length > 255) {
        msgEmitter.error(validationMsg.HASHTAG_TOO_LONG);
        this.setState({ hashtagInputValue: '' });
        return false;
      }
      if (registerItem === '') {
        msgEmitter.error(validationMsg.INVALID_HASHTAGS);
        return false;
      }
      if (registerItem.startsWith('#')) {
        if (registerItem.length === 1) {
          msgEmitter.error(validationMsg.INVALID_HASHTAGS);
          return false;
        }
        registerItem = registerItem.substring(1);
      }
      let hashtags = this.state.hashtags;
      if (hashtags.indexOf(registerItem) === -1) {
        hashtags.push(registerItem);
        this.setState({ hashtags: hashtags, hashtagInputValue: '' });
      } else {
        msgEmitter.error(validationMsg.HASHTAGS_CANNOT_BE_DUPLICATED);
        return false;
      }
    }
  }

  _onCancelHashtags(item, e) {
    e.preventDefault();
    let hashtags = this.state.hashtags;
    hashtags = _.without(hashtags, item);
    this.setState({ hashtags: hashtags });
    e.stopPropagation();
  }

  _dataValidation() {
    let messages = [];
    let evalData = this.state.evalData;

    if (evalData.body === '')
      messages.push(validationMsg.INPUT_EVALUATION_BODY);
    if (evalData.point_overall * evalData.point_gpa_satisfaction * evalData.point_easiness * evalData.point_clarity === 0)
      messages.push(validationMsg.INPUT_EVALUATION_SCORE);
    if (this.state.course_id === -1)
      messages.push(validationMsg.SELECT_COURSE);

    messages.map((message, idx) => {
      msgEmitter.info(message);
    });
    return messages.length === 0;
  }

  _onClickSubmit(e) {
    let course_id = this.state.course_id;
    let evalData = this.state.evalData;
    e.preventDefault();
    if (this._dataValidation()) {
      this.props.requestSubmit({ course_id, ...evalData }, this.state.hashtags);
    }
    e.stopPropagation();
  }

  render() {
    const { searchEnabled } = this.props;
    let evaluationItem = Object.keys(formItems).map((item, idx) => {
      return (
        <div key={idx}>
          <div className="col-xs-2 evaluation-slider-area evaluation-write-left">
            <img className="pull-right" src={formState[this.state.formState[item]].imgPath} />
            <span style={{marginRight: '8px', marginTop: '2px', fontSize: '12px', color: formState[this.state.formState[item]].color}} className="pull-right noto">{formState[this.state.formState[item]].text}</span>
          </div>
          <div style={formItems[item].divStyle} className="col-xs-9 evaluation-slider-area">
            <div className="row">
              <div className="text-center custom-col" style={{ width: '10%', minWidth: "65px" }}>
                <img src={formItems[item].imgPath} />
              </div>
              <div className="custom-col" style={{ width: '11%', minWidth: "70px" }}>
                <span style={{ color: formItems[item].color, verticalAlign: "middle" }} className={"noto" + (item === 'point_overall' ? ' font-bold' : '')}>{formItems[item].name}</span>
              </div>
              <div className="custom-col" style={{ width: '61%', minWidth: "305px", paddingTop: item === 'point_overall' ? '0' : '3px' }}>
                {
                  formItems[item].sliderType === 'star'
                    ? <IconRating
                        className="star-slider"
                        max={10}
                        currentRating={searchEnabled ? initialEvalValue[item] : this.state.evalData[item]}
                        toggledClassName="fa fa-2x fa-star"
                        untoggledClassName="fa fa-2x fa-star-o"
                        onChange={this._onChangeField.bind(this, item)} />
                    : <ReactSlider
                        className={"horizontal-slider " + "slider-" + item}
                        min={formItems[item].sliderSettings.min}
                        max={formItems[item].sliderSettings.max}
                        step={formItems[item].sliderSettings.step}
                        defaultValue={searchEnabled ? initialEvalValue[item] : this.state.evalData[item]}
                        withBars
                        onChange={this._onChangeField.bind(this, item)} />
                }
              </div>
              <div className="custom-col text-center" style={{  width: '12%', marginTop: item === 'point_overall' ? '-8px' : '0' }}>
                <div className={(item === 'point_overall' ? "total-score-item " : "score-circle ") + "text-center"} style={{ background: formItems[item].color }}>
                  <span className={(item === 'point_overall' ? "total-score-text " : "score-circle-text ") + "roboto"}>{this.state.evalData[item]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    let searchListItem;
    if (this.state.searchListVisibility || _.isEmpty(this.state.targetCourse)) {
      searchListItem =
        <input
          onKeyUp={searchEnabled ? this._onChangeQuery.bind(this) : ""}
          onFocus={searchEnabled ? this._onFocusSearchInput.bind(this) : ""}
          onBlur={searchEnabled ? this._onFocusOutSearchInput.bind(this) : ""}
          disabled={!searchEnabled}
          ref="queryInput"
          type="text"
          className="form-control noto evaluation-input"
          placeholder="*강의명 or 교수이름을 입력해주세요." />;
    } else if (!this.state.searchListVisibility) {
      let targetCourse = this.state.targetCourse;

      searchListItem =
        <div style={{height: '39px'}}>
          <div className="search-course-category-box" style={{ borderColor: courseCategory[targetCourse.category].color }}>
            <span className="noto search-course-category-text" style={{ color: courseCategory[targetCourse.category].color }}>{courseCategory[targetCourse.category].name}</span>
          </div>
          <span className="noto search-course-title-text">{targetCourse.name}</span>
          <span className="noto search-course-prof-name pull-right">{targetCourse.professor_name}&nbsp;교수님</span>
          <img className="search-course-prof-img pull-right" src={targetCourse.professor_photo_url} />
        </div>;
    }

    return (
      <div className="panel panel-default border-normal">
        <div className="panel-heading">
          <header>
            <span className="noto no-spacing panel-title">{this.props.title}</span>
            <span className="roboto panel-subtitle">WRITE EVALUATIONS</span>
          </header>
        </div>
        <div className="panel-body">
          <div className="form-horizontal">
            <div className="form-group row">
              <div className="col-xs-2 evaluation-slider-area evaluation-write-left" style={{ paddingTop: "21px" }}>
                <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/course.png" />
                <span style={{paddingLeft: '15px', fontSize: '15px', color: '#000000'}} className="control-label lecture-label font-bold noto">강의명</span>
              </div>
              <div className="col-xs-9 evaluation-slider-area" style={{ padding: "15px 0 0 0" }}>
                <div onClick={searchEnabled ? this._onClickSearchInput.bind(this) : ""} className="evaluation-input-wrapper">
                  {searchListItem}
                </div>
                <SearchedCourseList
                  courseList={this.state.query === '' ? [] : this.state.searchedCourses}
                  onClick={searchEnabled ? this._onClickSearchedItem.bind(this) : ""}
                  scroll={this._onScrollSearchResult.bind(this)}
                  visible={this.state.searchListVisibility}
                  searching={this.state.searching}
                  loading={this.state.loading} />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-2 evaluation-slider-area evaluation-write-left">
                <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/evaluation.png" />
                <span style={{paddingLeft: '15px', fontWeight: 'bold', fontSize: '15px', color: '#000000'}} className="control-label lecture-label noto">강의평가</span>
              </div>
              <div className="col-xs-9 evaluation-slider-area">
                <span style={{fontSize: '12px', color: '#808080'}} className="noto">*강의에 대한 평가를 마우스로 클릭해 주세요.</span>
              </div>
              {evaluationItem}
            </div>
            <div className="form-group row">
              <div className="col-xs-2 evaluation-write-left">
                <img className="pull-right" src={formState[this.state.formState['body']].imgPath} />
                <span style={{ marginRight: '8px', marginTop: '2px', fontSize: '12px', color: formState[this.state.formState['body']].color}} className="pull-right noto">{formState[this.state.formState['body']].text}</span>
              </div>
              <div className="col-xs-9 no-padding">
                <textarea className="form-control noto" style={{ width: '100%', border: '1px solid #ADADAD', borderRadius: '5.5px', fontWeight: 300}} value={this.state.evalData['body']} cols="30" rows="10" onChange={this._onChangeBody.bind(this)} placeholder="* 주관식 평가를 남겨주세요." />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-2 evaluation-slider-area evaluation-write-left">
                <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/tag.png" />
                <span style={{paddingLeft: '15px', fontWeight: 'bold', fontSize: '15px', color: '#000000'}} className="control-label lecture-label noto">태그</span>
              </div>
              <div className="col-xs-9 evaluation-slider-area" style={{padding: "16px 0 0 0", height: "auto"}}>
                <div className="evaluation-input-wrapper">
                  <HashtagList
                    onClick={this._onCancelHashtags.bind(this)}
                    hashtagList={this.state.hashtags}
                    removeIcon={true}
                    offset={false} />
                  <input value={this.state.hashtagInputValue}
                    onChange={this._onChangeHashtagInput.bind(this)}
                    onKeyUp={this._onAddHashtags.bind(this)}
                    type="text"
                    className="form-control noto evaluation-input"
                    placeholder="#태그를 입력해보세요."
                    style={{ padding: "10px", margin: "5px auto" }} />
                </div>
              </div>
              <HashtagList
                onClick={this._onClickRecommendedHashtags.bind(this)}
                hashtagList={this.state.recommendedHashtags}
                removeIcon={false}
                offset={true}
                style={{ padding: 0 }} />
            </div>
            <div className="form-group row text-center">
              <button onClick={this._onClickSubmit.bind(this)} className="btn-submit">
                <span className="evaluation-submit-text noto">{this.props.title}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
