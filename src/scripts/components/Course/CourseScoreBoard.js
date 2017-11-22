'use strict';

import React from 'react';

export default class CourseScoreBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, color, score } = this.props;

    return (
      <div className="row" style={{marginBottom: "5px"}}>
        <div className="col-xs-3 text-right" style={{padding: 0, marginRight: "20px"}}>
          <span className="noto" style={{color: color, fontSize: "13px", marginBottom: '3px'}}>{title}</span>
        </div>
        <div className="col-xs-4" style={{padding: 0}}>
          <div className="progress progress-xs" style={{height: '13px', marginTop: '5px', marginBottom: '5px', borderRadius: "6px"}}>
            <div className="progress-bar progress-bar-info" role="progressbar" ariaValuenow={score.toFixed(1)} ariaValuemin="0" ariaValuemax="10" style={{width: score.toFixed(1)*10 + '%', borderRadius: "6px", backgroundColor: color}}>
            </div>
          </div>
        </div>
        <div className="col-xs-4">
          <span className="roboto" style={{color: color, fontWeight: "bold", fontStyle: "italic", fontSize: "18px"}}>{!isNaN(score.toFixed(1)) ? score.toFixed(1) : 0} / 10</span>
        </div>
      </div>
    );
  }
};
