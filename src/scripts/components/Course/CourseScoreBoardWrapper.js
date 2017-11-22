'use strict';

import React from 'react';

import CourseScoreBoard from './CourseScoreBoard';

import RatingStars from '../Common/RatingStars';

export default class CourseScoreBoardWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let course = this.props.course;
    let point_overall = !isNaN((course.point_overall / course.evaluation_count).toFixed(1)) ? (course.point_overall / course.evaluation_count).toFixed(1) : 0;

    return (
      <div className="col-xs-10">
        <div className="row">
          <div className="panel-body panel-nopadding col-xs-5" style={{padding: 0, marginTop: "-20px"}}>
            <div className="row">
              <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/total_score.png" />
              <span className="total text-center roboto" style={{fontWeight: "bold", fontStyle: "italic", fontSize: "48px", color: "#E84646", marginLeft: "20px"}}>{point_overall} / 10</span>
            </div>
            <div className="row" style={{marginTop: "-2px"}}>
              <span className="title text-center noto" style={{fontSize: "16px", color: "#4d4d4d", marginLeft: "11px"}}>총점</span>
              <RatingStars stars={5} point={10} score={point_overall} color="#E84646" size={1.7} style={{ display: "inline-block", marginLeft: "40px" }} />
            </div>
          </div>
          <div className="col-xs-7">
            <CourseScoreBoard title='강의력' color={"#df5c5b"} score={course.evaluation_count === 0 ? 0 : course.point_clarity / course.evaluation_count} />
            <CourseScoreBoard title='널널함' color={"#27b3ad"} score= {course.evaluation_count === 0 ? 0 : course.point_easiness / course.evaluation_count} />
            <CourseScoreBoard title='학점만족도' color={"#52698d"} score={course.evaluation_count === 0 ? 0 : course.point_gpa_satisfaction / course.evaluation_count} />
          </div>
        </div>
      </div>
    );
  }
};
