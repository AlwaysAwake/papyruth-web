'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class AuthService extends BaseService {

  signin(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/sign_in',
      body: Object.assign({...params}, this.getClientSpecs())
    };

    return RequestHandler.POST(payload);
  }

  signup(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/sign_up',
      body: Object.assign({...params}, this.getClientSpecs())
    };

    return RequestHandler.POST(payload);
  }

  signout() {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/sign_out',
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  dropout(params) {
    let payload = {
      url: ApiConstants.BASE_URL + '',
      body: params,
      headers: this.getAuthHeader()
    }

    return RequestHandler.POST(payload);
  }
}

export default new AuthService();
