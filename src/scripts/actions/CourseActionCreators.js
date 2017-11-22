'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import CourseService from '../services/CourseService';


export default {
  getCourseDetail: (course_id) => {
    let promise = CourseService.getCourseDetail({ course_id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_COURSE_DETAIL,
      success: ActionTypes.REQUEST_COURSE_DETAIL_SUCCESS,
      failure: ActionTypes.REQUEST_COURSE_DETAIL_ERROR
    }, { course_id });
  },

  checkCourseViewNeedsUpdate: (course_id) => {
    dispatch(ActionTypes.CHECK_COURSE_VIEW_NEEDS_UPDATE, { course_id });
  },

  getFavoriteCourses: (params) => {
    let promise = CourseService.getFavoriteCourses(params);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_FAVORITE_COURSE,
      success: ActionTypes.REQUEST_FAVORITE_COURSE_SUCCESS,
      failure: ActionTypes.REQUEST_FAVORITE_COURSE_ERROR
    }, params);
  },

  setFavoriteCourse: (course, favorite, page) => {
    let id = course.id;
    let promise = CourseService.setFavoriteCourse({ id, favorite });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SET_FAVORITE_COURSE,
      success: ActionTypes.REQUEST_SET_FAVORITE_COURSE_SUCCESS,
      failure: ActionTypes.REQUEST_SET_FAVORITE_COURSE_ERROR
    }, { course, favorite, page });
  }
};
