'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UnivService from '../services/UnivService';


export default {
  getUnivInfo: () => {
    let promise = UnivService.getUnivInfo();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_UNIV_INFO,
      success: ActionTypes.REQUEST_UNIV_INFO_SUCCESS,
      failure: ActionTypes.REQUEST_UNIV_INFO_ERROR
    });
  },

  getSingleUnivInfo: (university_id) => {
    let promise = UnivService.getSingleUnivInfo({ university_id });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SINGLE_UNIV_INFO,
      success: ActionTypes.REQUEST_SINGLE_UNIV_INFO_SUCCESS,
      failure: ActionTypes.REQUEST_SINGLE_UNIV_INFO_ERROR
    }, { university_id });
  }
};
