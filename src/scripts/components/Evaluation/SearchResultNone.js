'use strict';

import React from 'react';

export default class SearchResultNone extends React.Component {
  render() {
    return (
      <div className="search-list-item text-center" style={{ border: "none" }}>
        <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/evaluation/search-result-none.png" style={{marginTop: "10px"}} />
        <h3 className="noto" style={{fontSize: "16px", color: "#939393", fontWeight: 400, marginTop: "10px"}}>검색 결과가 없습니다.</h3>
        <h4 className="noto" style={{fontSize: "14px", color: "#939393", fontWeight: 300, marginTop: "5px", marginBottom: "15px"}}>검색어를 수정해서 입력해보세요.</h4>
      </div>
    );
  }
};
