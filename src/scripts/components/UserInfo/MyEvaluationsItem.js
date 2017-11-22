'use strict';

import React from 'react';
import { timeStamp } from '../../utils/TimeConverter';

import RatingStars from '../Common/RatingStars';

import ViewConstants from '../../constants/ViewConstants';
const courseCategory = ViewConstants.Course.courseCategory;

export default class MyEvaluationsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { evaluation } = this.props;
    const evaluationBody = evaluation ? evaluation.body : '';

    let graphObj = {
      '강의력': [evaluation.point_clarity, "#df5c5b"],
      '널널함': [evaluation.point_easiness, "#27b3ad"],
      '학점만족도': [evaluation.point_gpa_satisfaction, "#52698d"]
    };

    let graphItem = Object.keys(graphObj).map((key, idx) => {
      return (
        <div key={idx}>
          <div style={{display: 'inline-block'}}>
            <span className="noto" style={{fontSize: '12px', color: graphObj[key][1]}}>{key}&nbsp;</span>
          </div>
          <div style={{display: 'inline-block'}}>
            <span className="roboto font-ubold font-italic" style={{color: graphObj[key][1], paddingLeft: '5px', fontSize: '22px'}}>{graphObj[key][0]}</span>
            <span className="roboto font-bold font-italic" style={{color: graphObj[key][1], fontSize: '14px'}}>/10</span>
          </div>
        </div>
      );
    });

    return (
      <div className="evaluation-hover" style={{minHeight: "180px", padding: "20px"}}>
        <div style={{width: '75%', display: 'inline-block', paddingLeft: '10px'}}>
          <img src={evaluation.avatar_url} style={{marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%'}} />
          <span className="noto" style={{fontSize: "16px", fontWeight: 'bold', color: "#333", marginRight: '30px', marginBottom: '5px'}}>{evaluation.lecture_name}</span>
          <div className="text-center" style={{display: 'inline-block', lineHeight: '15px', border: '1px solid #27b5af', borderRadius: '10px', width: '48px', height: '19px', borderColor: courseCategory[evaluation.lecture_category] ? courseCategory[evaluation.lecture_category].color : "#000" }}>
            <span className="noto course-category-text" style={{ color: courseCategory[evaluation.lecture_category] ? courseCategory[evaluation.lecture_category].color : "#000" }}>{ courseCategory[evaluation.lecture_category] ? courseCategory[evaluation.lecture_category].name : ""}</span>
          </div>
          <span className="noto" style={{fontSize: "13px", marginBottom: '5px', color: courseCategory[evaluation.lecture_category] ? courseCategory[evaluation.lecture_category].color : "#000"}}> {evaluation ? evaluation.professor_name : ""} 교수님</span>
          <p className="noto dont-break-out" style={{fontSize: "13px", color: "#808080", marginTop: '20px', marginBottom: '5px'}}>{evaluationBody}</p>
          <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up.png" style={{marginRight: '10px'}}/>
            <span className="noto" style={{marginRight: '10px', fontSize: '12px', color: '#C93940'}}>좋아요</span>
            <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#C93940'}}>{evaluation.up_vote_count}</span>
          </div>
          <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down.png" style={{marginRight: '10px'}} />
            <span className="noto" style={{marginRight: '10px', fontSize: '12px', color: '#245084'}}>싫어요</span>
            <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#245084'}}>{evaluation.down_vote_count}</span>
          </div>
          <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/reply.png" style={{marginRight: '10px'}}/>
            <span className="noto" style={{marginRight: '10px', fontSize: '12px', color: '#4D4D4D'}}>댓글</span>
            <span className="roboto font-ubold font-italic" style={{fontSize: '18px', color: '#4D4D4D'}}>{evaluation.comment_count}</span>
          </div>
        </div>
        <div className="pull-right text-right" style={{width: '25%', display: 'inline-block'}}>
          <h4 className="noto no-spacing">{timeStamp(evaluation.created_at)}</h4>
          <div>
            <RatingStars stars={5} point={10} score={evaluation.point_overall} color="#E84646" size={1} style={{ display: "inline-block" }} starStyle={{ marginRight: "3px" }} />
            <span className="roboto font-ubold font-italic" style={{fontSize: "25px", color: "#E84646", marginLeft: "5px"}}>{evaluation.point_overall}</span>
          </div>
          {graphItem}
        </div>
      </div>
    );
  }
};
