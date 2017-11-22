'use strict';

import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';


export default {
  signin: (email, password) => {
    let promise = AuthService.signin({ email, password });
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SIGNIN_USER,
      success: ActionTypes.REQUEST_SIGNIN_USER_SUCCESS,
      failure: ActionTypes.REQUEST_SIGNIN_USER_ERROR
    }, { email });
  },

  signup: (userInfo) => {
    let promise = AuthService.signup(userInfo);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SIGNUP_USER,
      success: ActionTypes.REQUEST_SIGNUP_USER_SUCCESS,
      failure: ActionTypes.REQUEST_SIGNUP_USER_ERROR
    }, userInfo);
  },

  signout: () => {
    let promise = AuthService.signout();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SIGNOUT_USER,
      success: ActionTypes.REQUEST_SIGNOUT_USER_SUCCESS,
      failure: ActionTypes.REQUEST_SIGNOUT_USER_ERROR
    });
  },

  dropout: () => {
    let promise = UserService.dropOut();
    dispatchAsync(promise, {
      request: ActionTypes.DROP_OUT,
      success: ActionTypes.DROP_OUT_SUCCESS,
      failure: ActionTypes.DROP_OUT_ERROR
    });
  },

  fetchUserInfo: () => {
    let promise = UserService.getMyInfo();
    dispatchAsync(promise, {
      request: ActionTypes.FETCH_USER_INFORMATIONS,
      success: ActionTypes.FETCH_USER_INFORMATIONS_SUCCESS,
      failure: ActionTypes.FETCH_USER_INFORMATIONS_ERROR
    });
  }
};
