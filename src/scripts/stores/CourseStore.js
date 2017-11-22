import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class CourseStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._courseDetail = {};
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_COURSE_DETAIL_SUCCESS:
        this.setCourseDetail(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SEARCH_COURSE_SUCCESS:
        this.setSearchResult(action.body);
        this.setSearchPage(action.page);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SEARCH_COURSE_FOR_EVAL_SUCCESS:
        this.setSearchResultForEval(action.body);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_COURSE_DETAIL_ERROR:
      case ActionTypes.REQUEST_SEARCH_COURSE_ERROR:
        this._error = action.error;
        this.emitChange();
        break;
    };
  }

  getCourseDetail() {
    return this._courseDetail;
  }

  setCourseDetail(course) {
    this._courseDetail = course.course;
  }

  getSearchResult() {
    return this._searchResult;
  }

  setSearchResult(results) {
    this._searchResult = results;
  }

  getSearchPage() {
    return this._searchPage;
  }

  setSearchPage(page) {
    this._searchPage = page;
  }

  getSearchResultForEval() {
    return this._searchResultForEval;
  }

  setSearchResultForEval(results) {
    this._searchResultForEval = results;
  }
}

export default new CourseStore;
