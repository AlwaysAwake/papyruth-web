'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserService from '../services/UserService';


export default {
  checkDuplicates: (page, target) => {
    let promise = UserService.checkDuplicates(target);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_CHECK_DUPLICATES,
      success: ActionTypes.REQUEST_CHECK_DUPLICATES_SUCCESS,
      failure: ActionTypes.REQUEST_CHECK_DUPLICATES_ERROR
    }, { page, ...target });
  },

  getMyInfo: () => {
    let promise = UserService.getMyInfo();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_MY_INFORMATIONS,
      success: ActionTypes.REQUEST_MY_INFORMATIONS_SUCCESS,
      failure: ActionTypes.REQUEST_MY_INFORMATIONS_ERROR
    });
  },

  changeMyInfo: (userInfo) => {
    let promise = UserService.changeMyInfo(userInfo);
    dispatchAsync(promise, {
      request: ActionTypes.CHANGE_MY_INFORMATIONS,
      success: ActionTypes.CHANGE_MY_INFORMATIONS_SUCCESS,
      failure: ActionTypes.CHANGE_MY_INFORMATIONS_ERROR
    });
  },

  changeMyPassword: (userInfo) => {
    let promise = UserService.changeMyPassword(userInfo);
    dispatchAsync(promise, {
      request: ActionTypes.CHANGE_MY_PASSWORD,
      success: ActionTypes.CHANGE_MY_PASSWORD_SUCCESS,
      failure: ActionTypes.CHANGE_MY_PASSWORD_ERROR
    });
  }
};
