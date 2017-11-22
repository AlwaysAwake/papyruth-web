import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class GlobalInfoStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._globalInfo = [];
  }

  _registerToActions(action) {
    this._actionType = action.type;
    switch(action.type) {
      case ActionTypes.REQUEST_GLOBAL_INFO_SUCCESS:
        this.setGlobalInfo(action.body);
        this._error = null;
        this.emitChange();

      case ActionTypes.REQUEST_GLOBAL_INFO_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      default:
        break;
    };
  }

  setGlobalInfo(body) {
    this._globalInfo = body.global_infos;
  }

  getGlobalInfo() {
    return this._globalInfo;
  }
}

export default new GlobalInfoStore;
