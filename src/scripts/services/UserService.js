'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class UserService extends BaseService {

  checkDuplicates(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/sign_up/validate',
      body: params
    };

    return RequestHandler.POST(payload);
  }

  getMyInfo() {
    let payload = {
      url: ApiConstants.BASE_URL + "users/me",
      headers: this.getAuthHeader()
    };

    return RequestHandler.GET(payload);
  }

  changeMyInfo(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/edit',
      body: params,
      headers: this.getAuthHeader()
    }

    return RequestHandler.POST(payload);
  }

  changeMyPassword(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/passwd',
      body: params,
      headers: this.getAuthHeader()
    }

    return RequestHandler.POST(payload);
  }
}

export default new UserService();
