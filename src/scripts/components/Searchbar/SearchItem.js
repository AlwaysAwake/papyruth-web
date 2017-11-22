'use strict';

import React from 'react';
import { Link } from 'react-router'

import ViewConstants from '../../constants/ViewConstants';

const courseCategory = ViewConstants.Evaluation.searchedCourseList.courseCategory;
const MAX_COURSE_NAME_LENGTH = ViewConstants.Searchbar.maximumCourseNameLength;
const MAX_PROFESSOR_NAME_LENGTH = ViewConstants.Searchbar.maximumProfessorNameLength;

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let course = this.props.course;

    let courseName = course ? course.name : "";
    if (courseName.length > MAX_COURSE_NAME_LENGTH) courseName = courseName.substring(0, MAX_COURSE_NAME_LENGTH) + ' ...';

    let professorName = course ? course.professor_name : "";
    if (professorName.length > MAX_PROFESSOR_NAME_LENGTH) professorName = professorName.substring(0, MAX_PROFESSOR_NAME_LENGTH) + ' ...';

    return (
      <tr className="unread">
        <td>
          <div className="search-course-category-box" style={{ borderColor: courseCategory[course.category].color, marginTop: '0px' }}>
            <span className="noto search-course-category-text" style={{ color: courseCategory[course.category].color }}>{courseCategory[course.category].name}</span>
          </div>
        </td>
        <td className="message" style={{paddingLeft: '0px'}}>
          <Link to={`/course/${this.props.course ? this.props.course.id : ''}`}>
            <span className="noto" style={{fontSize: "14px", color: "#666", fontWeight: '500'}}>{courseName}</span>
          </Link>
        </td>
        <td className="text-right">
          <span className="noto" style={{fontSize: "12px", color: "#808080", fontWeight: '300'}}>{professorName} 교수님</span>
        </td>
      </tr>
    );
  }
};
