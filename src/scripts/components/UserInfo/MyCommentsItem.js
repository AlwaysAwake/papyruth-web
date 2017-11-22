'use strict';

import React from 'react';
import { timeStamp } from '../../utils/TimeConverter';

import ViewConstants from '../../constants/ViewConstants';
const courseCategory = ViewConstants.Course.courseCategory;

export default class MyCommentsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let comment = this.props.comment;

    return (
      <div className="comment-hover" style={{paddingTop: '10px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '30px'}}>
        <div style={{width: '100%', display: 'inline-block', paddingLeft: '10px'}}>
          <h4 className="pull-right noto no-spacing">{timeStamp(comment.created_at)}</h4>
          <img src={comment.avatar_url} style={{marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%'}} />
          <span className="noto font-bold" style={{fontSize: "16px", color: "#333", marginRight: '30px', marginBottom: '5px'}}>{comment.lecture_name}</span>
          <div className="text-center" style={{display: 'inline-block', lineHeight: '15px', border: '1px solid #27b5af', borderRadius: '10px', width: '48px', height: '19px', borderColor: courseCategory[comment.lecture_category] ? courseCategory[comment.lecture_category].color : "#000" }}>
            <span className="noto course-category-text" style={{ color: courseCategory[comment.lecture_category] ? courseCategory[comment.lecture_category].color : "#000" }}>{ courseCategory[comment.lecture_category] ? courseCategory[comment.lecture_category].name : ""}</span>
          </div>
          <span className="noto" style={{fontSize: "13px", marginBottom: '5px', color: courseCategory[comment.lecture_category] ? courseCategory[comment.lecture_category].color : "#000"}}> {comment ? comment.professor_name : ""} 교수님</span>
          <div>
            <div style={{display: 'inline-block', marginLeft: '20px', marginRight: '10px', borderStyle: 'solid', borderColor: '#ADADAD', borderRight: '3px', borderTop: '3px', width: '10px', height: '10px'}}></div>
            <span className="noto dont-break-out" style={{fontSize: "13px", color: "#808080", marginBottom: '5px'}}>{comment.body}</span>
          </div>
          <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/up.png" style={{marginRight: '10px'}}/>
            <span className="noto" style={{marginRight: '10px', fontSize: '12px', color: '#C93940'}}>좋아요</span>
            <span className="roboto" style={{fontSize: '18px', fontWeight: 'bold', color: '#C93940'}}>{comment.up_vote_count} &nbsp;</span>
          </div>
          <div style={{display: 'inline-block', marginTop: '10px', marginRight: '15px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/course/down.png" style={{marginRight: '10px'}} />
            <span className="noto" style={{marginRight: '10px', fontSize: '12px', color: '#245084'}}>싫어요</span>
            <span className="roboto" style={{fontSize: '18px', fontWeight: 'bold', color: '#245084'}}>{comment.down_vote_count}</span>
          </div>
        </div>
      </div>
    );
  }
};
