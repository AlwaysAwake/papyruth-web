'use strict';

import React from 'react';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

import CourseActionCreators from '../../actions/CourseActionCreators';
import SearchActionCreators from '../../actions/SearchActionCreators';

import AuthStore from '../../stores/AuthStore';
import CourseStore from '../../stores/CourseStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const searchLimit = ViewConstants.Searchbar.searchLimit;

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      querySearched: '',
      courses: [],
      page: 1,
      lastPage: false,
      searching: false
    };
  }

  componentDidMount() {
    this.courseChangeListener = this._onSearchResultLoad.bind(this);
    CourseStore.addChangeListener(this.courseChangeListener);
  }

  componentWillUnmount() {
    CourseStore.removeChangeListener(this.courseChangeListener);
  }

  _onSearchResultLoad() {
    if (CourseStore.actionType === ActionTypes.REQUEST_SEARCH_COURSE_SUCCESS) {
      let newCourses = CourseStore.getSearchResult().courses;
      let newPage = CourseStore.getSearchPage();

      if (newCourses.length === 0) {
        if (newPage === 1)
          this.setState({ searching: false, courses: newCourses, page: newPage });
        else
          this.setState({ searching: false, page: newPage - 1, lastPage: true });
      }
      else if (newCourses.length < searchLimit)
        this.setState({ searching: false, page: newPage, courses: newCourses, lastPage: true });
      else
        this.setState({ searching: false, courses: newCourses, page: newPage });
    }
  }

  _onChange(e) {
    this.setState({ query: e.target.value });
  }

  _searchCourse(e) {
    if (this.state.query !== '' && (e.keyCode === 13 || e.type === 'click')) {
      this.setState({ searching: true, page: 1, querySearched: this.state.query, lastPage: false });
      SearchActionCreators.searchCourse(AuthStore.user.university_id, this.state.query, 1, searchLimit);
    }
  }

  _leftArrowClicked(page) {
    if (page > 1 && !this.state.searching) {
      page = page - 1;

      this.setState({ searching: true, lastPage: false });
      SearchActionCreators.searchCourse(AuthStore.user.university_id, this.state.querySearched, page, searchLimit);
    }
  }

  _rightArrowClicked(page) {
    if (this.state.courses.length === searchLimit && !this.state.searching && !this.state.lastPage) {
      page = page + 1;

      this.setState({ searching: true });
      SearchActionCreators.searchCourse(AuthStore.user.university_id, this.state.querySearched, page, searchLimit);
    }
  }

  render() {
    return (
      <div id="searchbar">
        <div id="search-box-open-option" data-flag="1"></div>
        <section className="panel panel-default">
          <div className="panel-heading">
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/searchbar/01.png" style={{width: "27px", height: "27px", marginRight: "5px"}}/>
            <span className="noto no-spacing panel-title">강의검색</span>
            <span className="roboto panel-subtitle">SEARCH COURSES</span>
          </div>
          <SearchForm
            onChange={this._onChange.bind(this)}
            triggerSearch={this._searchCourse.bind(this)} />
          <SearchResult courses={this.state.courses ? this.state.courses : []}
                        page={this.state.page}
                        searching={this.state.searching}
                        leftArrowClicked={this._leftArrowClicked.bind(this)}
                        rightArrowClicked={this._rightArrowClicked.bind(this)} />
        </section>
      </div>
    );
  }
}
