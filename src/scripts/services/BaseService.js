'use strict';

import AuthStore from '../stores/AuthStore';
import ApiConstants from '../constants/ApiConstants';

export default class BaseService {

  getAccessToken() {
    return 'Token token=\"'+ AuthStore.accessToken +'\"';
  }

  getAuthHeader() {
    return {
      "Authorization": this.getAccessToken()
    }
  }

  getClientSpecs() {
    return ApiConstants.clientSpecs;
  }
};
