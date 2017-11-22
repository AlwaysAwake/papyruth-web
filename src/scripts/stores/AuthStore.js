import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class AuthStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._accessToken = null;
    this._user = null;
    this._getInfoFromStorage();
    this._univEmailResult = null;
    this._passwordRenewMailResult = null;
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_SIGNIN_USER_SUCCESS:
      case ActionTypes.REQUEST_SIGNUP_USER_SUCCESS:
        this._accessToken = action.body.access_token;
        sessionStorage.setItem("access_token", this._accessToken);
        this._user = action.body.user;
        sessionStorage.setItem("user", JSON.stringify(this._user));
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.FETCH_USER_INFORMATIONS_SUCCESS:
        this._user = action.body.user;
        sessionStorage.setItem("user", JSON.stringify(this._user));
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SIGNOUT_USER:
      case ActionTypes.DROP_OUT_USER_SUCCESS:
        this._error = null;
        this._accessToken = null;
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
        this._user = null;
        this.emitChange();
        break;

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

      case ActionTypes.REQUEST_SIGNIN_USER_ERROR:
      case ActionTypes.REQUEST_SIGNUP_USER_ERROR:
      case ActionTypes.REQUEST_SIGNOUT_USER_ERROR:
      case ActionTypes.DROP_OUT_ERROR:
      case ActionTypes.REQUEST_REGISTER_UNIV_EMAIL_ERROR:
      case ActionTypes.REQUEST_PASSWORD_RENEW_MAIL_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  _getInfoFromStorage() {
    let tokenFromStorage = sessionStorage.getItem("access_token");
    let userFromStorage = JSON.parse(sessionStorage.getItem("user"));
    if (tokenFromStorage && tokenFromStorage !== ""
      && userFromStorage && userFromStorage !== "") {
      this._accessToken = tokenFromStorage;
      this._user = userFromStorage;
    }
  }

  get user() {
    return this._user;
  }

  get accessToken() {
    return this._accessToken;
  }

  isSignedIn() {
    return !!this._accessToken && !!this._user;
  }
}

export default new AuthStore;
