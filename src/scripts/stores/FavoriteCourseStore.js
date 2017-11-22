import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

import ViewConstants from '../constants/ViewConstants';
const limit = ViewConstants.Favoritebar.limit;

class FavoriteCourseStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._favoriteCourses = [];
    this._favoritePage = 1;
    this._result = null;
    this._unsettedCourseId = null;
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_FAVORITE_COURSE_SUCCESS:
        this.setFavoriteCourses(action.body.favorites);
        this.setFavoritePage(action.page);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SET_FAVORITE_COURSE_SUCCESS:
        this._result = action.favorite;
        if (action.favorite)
          this.addFavoriteCourse(action.course);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.CHECK_COURSE_VIEW_NEEDS_UPDATE:
        this._unsettedCourseId = action.course_id;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_FAVORITE_COURSE_ERROR:
      case ActionTypes.REQUEST_SET_FAVORITE_COURSE_ERROR:
        this._error = action.error;
        this.emitChange();
        break;
    };
  }

  getFavoriteCourses() {
    return this._favoriteCourses;
  }

  setFavoriteCourses(results) {
    this._favoriteCourses = results;
  }

  getFavoritePage() {
    return this._favoritePage;
  }

  setFavoritePage(page) {
    this._favoritePage = page;
  }

  isCourseViewNeedsUpdate() {
    return this._unsettedCourseId;
  }

  getResult() {
    return this._result;
  }

  addFavoriteCourse(course) {
    let newObject = { course };

    if (this._favoriteCourses.length < limit)
      this._favoriteCourses = this._favoriteCourses.concat(newObject);
  }
}

export default new FavoriteCourseStore;
