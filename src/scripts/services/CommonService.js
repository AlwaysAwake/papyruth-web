'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class CommonService extends BaseService {

  getTotalStatistics() {
    let payload = { url: ApiConstants.BASE_URL + 'info' };
    return RequestHandler.GET(payload);
  }

  getModalContents(params) {
    let payload = { url: ApiConstants.BASE_URL + 'terms/' + params.id };
    return RequestHandler.GET(payload);
  }

  getGlobalInfo() {
    let payload = { url: ApiConstants.BASE_URL + 'global_infos'};
    return RequestHandler.GET(payload);
  }

}

export default new CommonService();
