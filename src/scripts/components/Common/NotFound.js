'use strict';

import React from 'react';
import { Link } from 'react-router';

import history from '../../history';


export default class NotFound extends React.Component {

  _goBack() {
    history.go(-1);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-3 col-xs-6">
          <div id="error-container" className="block-error">
            <header>
              <h1 className="error">404</h1>
              <p className="text-center noto">페이지를 찾을 수 없습니다.</p>
            </header>
            <p className="text-center noto">입력하신 주소에 해당하는 페이지를 찾을 수 없습니다. 주소를 확인해주세요.</p>
            <div className="row">
              <div className="col-xs-6">
                <Link to="/" className="btn btn-info btn-block btn-3d noto">메인으로 돌아가기</Link>
              </div>
              <div className="col-xs-6">
                <button className="btn btn-success btn-block btn-3d noto" onClick={this._goBack.bind(this)}>이전 페이지로 돌아가기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
