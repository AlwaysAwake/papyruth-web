'use strict';

import React from 'react';

import history from '../../history';


export default class EvaluationsNone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center" style={{marginTop: "20px"}}>
        <img className="list-none-img" src={"//d2pqv3srin2mqf.cloudfront.net/web_resources/images/userinfo/evaluation_none.png"} />
        <h3 className="noto" style={{fontSize: "16px", color: "#939393", fontWeight: 400, marginTop: "20px"}}>작성된 강의평가가 없습니다.</h3>
      </div>
    );
  }
};
