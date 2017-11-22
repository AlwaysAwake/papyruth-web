'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import CommonService from '../services/CommonService';


export default {
  getTotalStatistics: () => {
    let promise = CommonService.getTotalStatistics();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_TOTAL_STATISTICS,
      success: ActionTypes.REQUEST_TOTAL_STATISTICS_SUCCESS,
      failure: ActionTypes.REQUEST_TOTAL_STATISTICS_ERROR
    });
  },

  getModalContents: (id) => {
    let promise = CommonService.getModalContents({ id: id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_MODAL_CONTENTS,
      success: ActionTypes.REQUEST_MODAL_CONTENTS_SUCCESS,
      failure: ActionTypes.REQUEST_MODAL_CONTENTS_ERROR
    });
  },

  getGlobalInfo: () => {
    let promise = CommonService.getGlobalInfo();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_GLOBAL_INFO,
      success: ActionTypes.REQUEST_GLOBAL_INFO_SUCCESS,
      failure: ActionTypes.REQUEST_GLOBAL_INFO_ERROR
    });
  }
};
