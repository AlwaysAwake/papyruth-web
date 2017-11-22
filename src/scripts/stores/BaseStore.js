import EventEmitter from 'eventemitter3';
import { register } from '../dispatchers/AppDispatcher';

const CHANGE_EVENT = 'change';

export default class BaseStore extends EventEmitter {

  constuctor() {
    super.constructor();
    this._actionType = null;
    this._error = null;
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  get actionType() {
    return this._actionType;
  }

  get error() {
    return this._error;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}
