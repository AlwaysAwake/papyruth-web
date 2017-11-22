'use strict';

import React from 'react';

import { Link } from 'react-router'

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick(e) {
    if(this.props.course)
      this.props.setFavoriteCourse(this.props.course, this.props.index);
    else
      e.preventDefault();
  }

  render() {
    return (
      <tr className="unread">
        <td>
          <a onClick={this._onClick.bind(this)}>
            <i className="fa fa-star"></i>
          </a>
        </td>
        <td className="message">
          <Link to={`/course/${this.props.course ? this.props.course.id : ''}`}>
            <span className="noto" style={{fontSize: "14px", color: "#666"}}>{this.props.course? this.props.course.name : ""}</span>
          </Link>
        </td>
        <td className="text-right">
          <span className="noto" style={{fontSize: "12px", color: "#808080"}}>{this.props.course ? this.props.course.professor_name : ""} 교수님</span>
        </td>

      </tr>
    );
  }
}

export default SearchItem;
