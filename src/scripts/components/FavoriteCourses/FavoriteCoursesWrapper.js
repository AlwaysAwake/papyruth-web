'use strict';

import React from 'react';

import LoadingComponent from '../Common/LoadingComponent';
import FavoriteCourseItem from './FavoriteCourseItem';

class FavoriteCoursesWrapper extends React.Component {
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
    let page = this.props.page ? this.props.page : 1;

    let item = this.props.favorites ? this.props.favorites.map((favorite, index) => {
                  return <FavoriteCourseItem key={index} index={index} course={favorite.course} setFavoriteCourse={this.props.setFavoriteCourse} />
                }) : "";

    let loading = this.props.loading ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    return (
      <div id="search-result-toggle-content">
        <div className="panel-body minimal" style={{paddingTop: '10px !important'}}>
          <div className="mail-option">
            <p className="noto no-spacing" style={{fontSize: '13px', color: '#B3B8C3'}}>관심강의를 해제하시려면 <i className="fa fa-star" style={{fontSize: '17px', color: '#EDCE8C'}}></i>을 클릭해주세요.</p>
            <div className="btn-group">
              <button type="button" className="dropdown-toggle searchbar-dropdown" dataToggle="dropdown">
                <span className="noto" style={{fontSize: '12px', lineHeight: '29.29px', color: '#808080', marginRight: '10px'}}>등록순</span>
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
            {loading}
            <table className="table table-inbox table-hover">
              <tbody>
                {this.props.loading ? "" : item}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteCoursesWrapper;
