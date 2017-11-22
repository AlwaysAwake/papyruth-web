'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SearchService from '../services/SearchService';


export default {
  searchCourse: (university_id, query, page, limit) => {
    let promise = SearchService.searchCourse({ university_id, query, page, limit });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SEARCH_COURSE,
      success: ActionTypes.REQUEST_SEARCH_COURSE_SUCCESS,
      failure: ActionTypes.REQUEST_SEARCH_COURSE_ERROR
    }, { university_id, query, page, limit });
  },

  searchCourseForEval: (university_id, query, page, limit) => {
    let promise = SearchService.searchCourse({ university_id, query, page, limit });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SEARCH_COURSE_FOR_EVAL,
      success: ActionTypes.REQUEST_SEARCH_COURSE_FOR_EVAL_SUCCESS,
      failure: ActionTypes.REQUEST_SEARCH_COURSE_FOR_EVAL_ERROR
    }, { university_id, query, page, limit });
  }
};
