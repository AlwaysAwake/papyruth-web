'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import MailService from '../services/MailService';


export default {
  registerUnivEmail: (email) => {
    let promise = MailService.registerUnivEmail({ email });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_REGISTER_UNIV_EMAIL,
      success: ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_SUCCESS,
      failure: ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_ERROR
    }, { email });
  },

// confirmation type(0: normal, 1: university)
  sendConfirmMail: (type) => {
    let promise = MailService.sendConfirmMail({ type });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SEND_CONFIRM_MAIL,
      success: ActionTypes.REQUEST_SEND_CONFIRM_MAIL_SUCCESS,
      failure: ActionTypes.REQUEST_SEND_CONFIRM_MAIL_ERROR
    }, { emailType: type });
  },

  sendPasswordRenewMail: (email) => {
    let promise = MailService.sendPasswordRenewMail({ email });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_PASSWORD_RENEW_MAIL,
      success: ActionTypes.REQUEST_PASSWORD_RENEW_MAIL_SUCCESS,
      failure: ActionTypes.REQUEST_PASSWORD_RENEW_MAIL_ERROR
    }, { email });
  },

  sendMigrateMail: (email) => {
    let promise = MailService.sendMigrateMail({ email });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_MIGRATE_MAIL,
      success: ActionTypes.REQUEST_MIGRATE_MAIL_SUCCESS,
      failure: ActionTypes.REQUEST_MIGRATE_MAIL_ERROR
    }, { email });
  }
};
