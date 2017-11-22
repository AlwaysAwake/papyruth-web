import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class UnivStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._univInfo = [];
    this._singleUnivInfo = {};
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_UNIV_INFO_SUCCESS:
        this.setUnivInfo(action.body.universities);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SINGLE_UNIV_INFO_SUCCESS:
        this.setSingleUnivInfo(action.body);
        this._error = null;
        this.emitChange();
        break;

      default:
        break;
    };
  }

  getUnivInfo() {
    return this._univInfo;
  }

  setUnivInfo(info) {
    this._univInfo = info;
  }

  getSingleUnivInfo() {
    return this._singleUnivInfo;
  }

  setSingleUnivInfo(body) {
    this._singleUnivInfo = body.university;
  }
}

export default new UnivStore;
