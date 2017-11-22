'use strict';

import React from 'react';

import ViewConstants from '../../constants/ViewConstants';
const courseCategory = ViewConstants.Evaluation.searchedCourseList.courseCategory;
const length = ViewConstants.Evaluation.searchedCourseList.maximumProfessorNameLength;

import { truncate } from '../../utils/Formatter';


export default class SearchedCourseItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let course = this.props.course;

    return (
      <div onMouseDown={this.props.onClick.bind(null, course)} className="search-list-item cursorlink">
        <div className="course-category-box" style={{ borderColor: courseCategory[course.category].color }}>
          <span className="noto course-category-text" style={{ color: courseCategory[course.category].color }}>{courseCategory[course.category].name}</span>
        </div>
        <span className="noto course-title-text">{course.name}</span>
        <span className="noto pull-right course-prof-name">{truncate(course.professor_name, length)}&nbsp;교수님</span>
        <img className="pull-right course-prof-img" src={course.professor_photo_url} />
      </div>
    );
  }
};
