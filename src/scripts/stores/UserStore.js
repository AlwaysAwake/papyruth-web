import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class UserStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._actionType, this._dupCheckedPage, this._dupCheckedResult, this._dupCheckedField, this._dupCheckedValue, this._error = null;
    this._dupValidated = {
      signup: {
        email: null,
        nickname: null
      },
      changeProfile: {
        email: true,
        nickname: null
      }
    };
    this._dupCheckedStatus = null;
    this._userInfo = {};
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch (action.type) {
      case ActionTypes.REQUEST_CHECK_DUPLICATES_SUCCESS:
        this._actionType = action.type;
        this._dupCheckedPage = action.page;
        this._dupCheckedResult = action.body.validation;
        this._dupCheckedStatus = action.body.status;
        this._dupCheckedField = action.name;
        this._dupCheckedValue = action.value;
        if (action.value === '') {
          this._dupCheckedResult = null;
          this._dupCheckedStatus = null;
          this._dupValidated[this._dupCheckedPage][this._dupCheckedField] = null;
        } else {
          this._dupValidated[this._dupCheckedPage][this._dupCheckedField] = this._dupCheckedResult;
          this.emitChange();
        }
        break;

      case ActionTypes.REQUEST_MY_INFORMATIONS_SUCCESS:
        this._actionType = action.type;
        this._userInfo = action.body.user;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.CHANGE_MY_INFORMATIONS_SUCCESS:
      case ActionTypes.CHANGE_MY_PASSWORD_SUCCESS:
        this._actionType = action.type;
        this.emitChange();
        break;

      case ActionTypes.CHANGE_MY_INFORMATIONS_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_MY_INFORMATIONS_ERROR:
      case ActionTypes.REQUEST_CHECK_DUPLICATES_ERROR:
        this._error = action.error;
        break;

      default:
        break;
    }
  }

  get checkedResult() {
    return this._dupCheckedResult;
  }

  get checkedField() {
    return this._dupCheckedField;
  }

  get checkedValue() {
    return this._dupCheckedValue;
  }

  get checkedStatus() {
    return this._dupCheckedStatus;
  }

  get userInfo() {
    return this._userInfo;
  }

  isValidated() {
    let page = this._dupCheckedPage;
    if (!page) {
      return false;
    } else {
      return !!this._dupValidated[page].email && !!this._dupValidated[page].nickname;
    }
  }

  resetValidation(page, field) {
    this._dupValidated[page][field] = null;
  }
}

export default new UserStore();
