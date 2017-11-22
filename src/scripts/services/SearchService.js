'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class SearchService extends BaseService {

  searchCourse(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'search/search',
      query: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

}

export default new SearchService();
