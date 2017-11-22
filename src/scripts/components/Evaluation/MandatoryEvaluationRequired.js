'use strict';

import React from 'react';
import { Link } from 'react-router';

import history from '../../history';

import UserStore from '../../stores/UserStore';


export default class MandatoryEvaluationRequired extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClickRedirect(e) {
    e.preventDefault();
    history.replaceState(null, '/evaluation/write');
    e.stopPropagation();
  }

  render() {
    return (
      <div className="panel panel-default" style={{ minHeight: "768px" }}>
        <div className="panel-body">
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-xs-12 text-center">
              <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/mandatory_evaluation_required/icon.png" alt="" />
            </div>
            <div className="col-xs-12 text-center margin-top40">
              <h3 className="noto font-light">아직 이번학기 <span className="font-bold">강의평가</span>를 다 작성하지 않으셨어요.</h3>
              <h3 className="noto font-light margin-top20">다른 학생들이 작성한 강의평가가 보고 싶으시다면</h3>
              <h3 className="noto font-light margin-top20"><span className="font-bold">남은 강의평 {this.props.params.count}개를 더 작성</span>해주세요.</h3>
            </div>
            <div className="col-xs-12 text-center margin-top40">
              <button onClick={this._onClickRedirect.bind(this)} className="btn-submit">
                <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/mandatory_evaluation_required/pen.png" style={{ marginRight: "8px" }} alt="" />
                <span className="evaluation-submit-text noto">작성하러 가기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
