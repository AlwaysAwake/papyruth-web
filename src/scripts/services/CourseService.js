'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class CourseService extends BaseService {

  getCourseDetail(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'courses/' + params.course_id,
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  getFavoriteCourses(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/favorites',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  setFavoriteCourse(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'courses/' + params.id + '/favorite',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }
}

export default new CourseService();
