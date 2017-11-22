'use strict';

import React from 'react';

import CommonActionCreators from '../../actions/CommonActionCreators';

import CommonStore from '../../stores/CommonStore';

export default class TotalStatistics extends React.Component {

  constructor() {
    super();
    this.state = {
      statistics: {}
    };
    CommonActionCreators.getTotalStatistics();
  }

  componentWillMount() {
    this.changeListener = this._onStatisticsLoad.bind(this);
    CommonStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    CommonStore.removeChangeListener(this.changeListener);
  }

  _onStatisticsLoad() {
    this.setState({statistics: CommonStore.statistics});
  }

  render() {
    return (
      <div className="row">
        <div className="row text-center" style={{margin: "15px auto"}}>
          <span className="noto font-bold" style={{fontSize: '14px', color: '#000'}}>대학강의평가시스템</span>
          <br/>
          <span className="noto" style={{fontSize: '24px', color: '#000'}}>
            <span className="font-bold">파피루스</span>
            에서는
          </span>
        </div>
        <div className="row text-center" style={{margin: '15px auto 0 auto', maxWidth: '900px'}}>
          <div className="col-xs-4 signin-stats">
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/signin/01.png" />
            <span className="roboto stats-number">{this.state.statistics.university_count} </span>
            <span className="noto stats-text"> 개 학교에서</span>
          </div>
          <div className="col-xs-4 signin-stats">
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/signin/02.png" />
            <span className="roboto stats-number">{this.state.statistics.user_count} </span>
            <span className="noto stats-text"> 명이 </span>
          </div>
          <div className="col-xs-4 signin-stats">
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/signin/03.png" />
            <span className="roboto stats-number">{this.state.statistics.evaluation_count} </span>
            <span className="noto stats-text"> 개의</span>
          </div>
        </div>
        <div className="row text-center">
          <span className="noto" style={{fontSize: '24px', color: '#000'}}>
            <span className="font-bold" style={{color: '#000'}}>강의평을</span> 작성하셨습니다.
          </span>
        </div>
      </div>
    );
  }

};
