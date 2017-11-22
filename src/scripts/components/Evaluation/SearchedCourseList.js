'use strict';

import React from 'react';

import SearchedCourseItem from './SearchedCourseItem';
import SearchResultNone from './SearchResultNone';
import LoadingComponent from '../Common/LoadingComponent';

export default class SearchedCourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let courseItem;
    let searching = this.props.searching ? <LoadingComponent message={"Searching..."} display={"block"} /> : <LoadingComponent message={"Searching..."} display={"none"}/>;
    let loading = this.props.loading ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    if (this.props.courseList.length === 0) {
      courseItem =  <SearchResultNone />;
    } else {
      courseItem = this.props.courseList.map((item, idx) => {
        return (
          <SearchedCourseItem onClick={this.props.onClick} key={idx} course={item} />
        );
      });
    }

    return (
      <div onScroll={this.props.scroll.bind(this)} style={{ display: this.props.visible ? 'block' : 'none' }} className="search-list-wrapper" id="search-input">
        {searching}
        {this.props.searching ? "" : courseItem}
        {loading}
      </div>
    );
  }
};
