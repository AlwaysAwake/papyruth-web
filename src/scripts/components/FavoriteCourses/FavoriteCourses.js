'use strict';

import React from 'react';
import _ from 'underscore';

import FavoriteCoursesWrapper from './FavoriteCoursesWrapper';

import CourseActionCreators from '../../actions/CourseActionCreators';

import FavoriteCourseStore from '../../stores/FavoriteCourseStore';

import ViewConstants from '../../constants/ViewConstants';
const validationMsg = ViewConstants.validationMessages;
const limit = ViewConstants.Favoritebar.limit;


export default class FavoriteCourses extends React.Component {
  constructor(props) {
    super(props);
    CourseActionCreators.getFavoriteCourses({ since_id: 0, limit, page: 1});
    this.state = {favorites: [], loading: true, page: 1, lastPage: false};
  }

  componentDidMount() {
    this.changeListener = this._onFavoriteCoursesLoad.bind(this);
    FavoriteCourseStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    FavoriteCourseStore.removeChangeListener(this.changeListener);
  }

  _onFavoriteCoursesLoad() {
    let favoriteCourses = FavoriteCourseStore.getFavoriteCourses();
    let page = FavoriteCourseStore.getFavoritePage();
    this.setState({ loading: false });

    if (favoriteCourses.length !== 0)
      this.setState({ favorites: favoriteCourses, page });
    else
      this.setState({ page: page - 1, lastPage: true });
  }

  _unsetFavoriteCourse(course, index) {
    let favorite = false;
    CourseActionCreators.setFavoriteCourse(course, favorite);
    CourseActionCreators.checkCourseViewNeedsUpdate(course.id);

    this.state.favorites.splice(index, 1);
    msgEmitter.success(validationMsg.FAVORITE_COURSE_REMOVE_SUCCESS);
  }

  _leftArrowClicked(page) {
    if (page > 1 && !this.state.loading) {
      page = page - 1;
      let maxID = this.state.favorites[0].id - 1;

      this.setState({ loading: true, lastPage: false });
      CourseActionCreators.getFavoriteCourses({ max_id: maxID, limit, page });
    }
  }

  _rightArrowClicked(page) {
    if (this.state.favorites.length === limit && !this.state.loading && !this.state.lastPage) {
      page = page + 1;
      let sinceID = this.state.favorites[this.state.favorites.length - 1].id;

      this.setState({ loading: true });
      CourseActionCreators.getFavoriteCourses({ since_id: sinceID, limit, page });
    }
  }

  render() {
    return (
      <div id="favorite-courses-bar">
        <div id="search-box-open-option" data-flag="1"></div>
        <section className="panel panel-default">
          <div className="panel-heading">
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/favorite_course.png" style={{width: "27px", height: "27px", marginTop: "-5px", marginRight: "5px"}}/>
            <span className="noto panel-title no-spacing">관심강의</span>
            <span className="roboto panel-subtitle">FAVORITE COURSES</span>
          </div>
          <FavoriteCoursesWrapper favorites={this.state.favorites ? this.state.favorites : []}
                                  setFavoriteCourse={this._unsetFavoriteCourse.bind(this)}
                                  page={this.state.page}
                                  leftArrowClicked={this._leftArrowClicked.bind(this)}
                                  rightArrowClicked={this._rightArrowClicked.bind(this)}
                                  loading={this.state.loading} />
        </section>
      </div>
    );
  }
}
