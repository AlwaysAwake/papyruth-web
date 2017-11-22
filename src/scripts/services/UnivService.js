'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class UnivService extends BaseService {

  getUnivInfo() {
    let payload = { url: ApiConstants.BASE_URL + 'universities' };
    return RequestHandler.GET(payload);
  }

  getSingleUnivInfo(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'universities/' + params.university_id,
      headers: this.getAuthHeader()
    }

    return RequestHandler.GET(payload);
  }
}

export default new UnivService();
