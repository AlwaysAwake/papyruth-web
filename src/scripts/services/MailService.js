'use strict';

import BaseService from './BaseService';

import ApiConstants from '../constants/ApiConstants';
import RequestHandler from '../utils/RequestHandler';

class MailService extends BaseService {

  registerUnivEmail(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'users/me/university_email',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  sendConfirmMail(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'email/confirm',
      body: params,
      headers: this.getAuthHeader()
    };

    return RequestHandler.POST(payload);
  }

  sendPasswordRenewMail(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'email/password',
      body: params
    };

    return RequestHandler.POST(payload);
  }

  sendMigrateMail(params) {
    let payload = {
      url: ApiConstants.BASE_URL + 'email/migrate',
      body: params
    };

    return RequestHandler.POST(payload);
  }
}

export default new MailService();
