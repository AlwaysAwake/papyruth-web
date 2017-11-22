'use strict';

import React from 'react';

import history from '../../history';

import ViewConstants from '../../constants/ViewConstants';
const contentName = ViewConstants.UserInfo.ItemsNone.contentName;

export default class ItemsNone extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick() {
    history.replaceState(null, "/evaluation/write");
  }

  _renderWrite() {
    if (this.props.contentType === "evaluation") {
      return (
        <div>
          <h4 className="text-center noto" style={{fontSize: "14px", color: "#939393", fontWeight: 300, marginTop: "5px", marginBottom: "15px"}}>첫번째 강의평가를 작성해보세요.</h4>
          <button onClick={this._onClick.bind(this)} className="btn-redirect" style={{ marginBottom: "20px" }}>
            <span className="evaluation-submit-text noto" style={{ color: "#29B5A9" }}>강의평가 작성하기</span>
          </button>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="text-center">
        <img className="list-none-img" src={"//d2pqv3srin2mqf.cloudfront.net/web_resources/images/userinfo/" + this.props.contentType + "_none.png"} style={{marginTop: "40px"}} />
        <h3 className="noto" style={{fontSize: "16px", color: "#939393", fontWeight: 400, marginTop: "20px"}}>{"작성한 " + contentName[this.props.contentType] + " 없습니다."}</h3>
        {this._renderWrite()}
      </div>
    );
  }
};
