import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class CommonStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._modalTitle = null;
    this._modalContents = {};
    this._statistics = {};
  }

  _registerToActions(action) {
    switch(action.type) {
      case ActionTypes.REQUEST_TOTAL_STATISTICS_SUCCESS:
        this._statistics = action.body;
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_TOTAL_STATISTICS_ERROR:
        this._error = action.error;
        break;

      case ActionTypes.REQUEST_MODAL_CONTENTS_SUCCESS:
        let modalTitle;
        if (action.body.term) {
          modalTitle = 'term';
        } else if (action.body.license) {
          modalTitle = 'license';
        }
        this._modalTitle = modalTitle;
        this._modalContents = action.body[modalTitle];
        this.emitChange();
        break;

      case ActionTypes.REQUEST_MODAL_CONTENTS_ERROR:
        this._error = action.error;
        break;
    };
  }

  get statistics() {
    return this._statistics;
  }

  get modalTitle() {
    return this._modalTitle;
  }

  get modalContents() {
    return this._modalContents;
  }

}

export default new CommonStore;
