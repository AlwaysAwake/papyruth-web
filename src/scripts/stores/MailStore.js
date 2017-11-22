import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class MailStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._univEmailResult = null;
    this._passwordRenewMailResult = null;
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_SUCCESS:
        this._error = null;
        this._univEmailResult = action.body.success;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_PASSWORD_RENEW_MAIL_SUCCESS:
        this._error = null;
        this._passwordRenewMailResult = action.body.success;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SEND_CONFIRM_MAIL_SUCCESS:
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_ERROR:
      case ActionTypes.REQUEST_PASSWORD_RENEW_MAIL_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      default:
        break;
    }
  }
}

export default new MailStore;
