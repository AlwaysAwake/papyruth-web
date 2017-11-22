'use strict';

import React from 'react';

import LoadingComponent from '../Common/LoadingComponent';
import SearchItem from './SearchItem';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  _leftArrowClicked(e) {
    e.preventDefault();

    this.props.leftArrowClicked(this.props.page);
  }

  _rightArrowClicked(e) {
    e.preventDefault();

    this.props.rightArrowClicked(this.props.page);
  }

  render() {
    let page = this.props.page ? this.props.page : 0;
    let itemNone = "";
    let item =
      this.props.courses
      ? this.props.courses.map((course, idx) => {
          return <SearchItem key={idx} course={course} />
        })
      : "";

    let searching = this.props.searching ? <LoadingComponent message={"Searching..."} display={"block"} /> : <LoadingComponent message={"Searching..."} display={"none"}/>;

    if (this.props.courses.length === 0) {
      itemNone = <div className="text-center">
                   <h3 className="noto" style={{fontSize: "16px", color: "#939393", fontWeight: 400, marginTop: "20px"}}>검색 결과가 없습니다.</h3>
                 </div>
    }

    return (
      <div id="search-result-toggle-content">
        <div className="panel-body minimal">
          <div className="mail-option">
            <div className="btn-group">
              <button type="button" className="dropdown-toggle searchbar-dropdown" dataToggle="dropdown">
                <span className="noto" style={{fontSize: '12px', lineHeight: '29.29px', color: '#808080', marginRight: '10px'}}>정확도순</span>
                <span className="caret" style={{marginLeft: '10px'}}></span>
              </button>
            </div>
            <ul className="inbox-pag pull-right">
              <li><div style={{display: 'table'}}><span className="roboto" style={{fontSize: '15px', color: '#c6c6c6', display: 'table-cell', verticalAlign: 'middle'}}>Page {page}</span></div></li>
              <li><a href="#" onClick={this._leftArrowClicked.bind(this)}><div className="hover-opacity-50"><img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/searchbar/left_arrow.png" /></div></a></li>
              <li><a href="#" onClick={this._rightArrowClicked.bind(this)}><div className="hover-opacity-50"><img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/searchbar/right_arrow.png" /></div></a></li>
            </ul>
          </div>
          <div className="table-responsive" style={{overflowX: 'visible'}}>
            {this.props.searching ? "" : itemNone}
            {searching}
            <table className="table table-inbox table-hover">
              <tbody>
                {this.props.searching ? "" : item}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};
