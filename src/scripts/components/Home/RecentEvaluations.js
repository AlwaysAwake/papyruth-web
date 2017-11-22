'use strict';

import React from 'react';
import { Link } from 'react-router';

import EvaluationActionCreators from '../../actions/EvaluationActionCreators';

import LoadingComponent from '../Common/LoadingComponent';

import SingleEvaluation from './SingleEvaluation';
import AuthStore from '../../stores/AuthStore';
import EvaluationStore from '../../stores/EvaluationStore';

import ViewConstants from '../../constants/ViewConstants';
const count = ViewConstants.Home.RecentEvaluations.contentsCountPerRequest;


export default class RecentEvaluations extends React.Component {
  constructor() {
    super();
    EvaluationActionCreators.getRecentEvals({ university_id: AuthStore.user.university_id, limit: count }, 1)
    this.state = {
      evaluations: [],
      loading: true
    };
  }

  componentWillMount() {
    this.changeListener = this._onRecentEvalsLoad.bind(this);
    this.scrollListener = this._onScroll.bind(this);
    EvaluationStore.addChangeListener(this.changeListener);
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    EvaluationStore.removeChangeListener(this.changeListener);
    window.removeEventListener('scroll', this.scrollListener);
  }

  _onScroll() {
    if (window.scrollY > 0) {
      var scrollPercent = (window.scrollY + window.innerHeight) / window.document.body.scrollHeight * 100;

      if (scrollPercent >= 100) {
        this.setState({ loading: true });
        EvaluationActionCreators.getRecentEvals({ university_id: AuthStore.user.university_id, limit: count, max_id: this.state.evaluations[this.state.evaluations.length - 1].id - 1});
      }
    }
  }

  _onRecentEvalsLoad() {
    let duplicateFlag = false;

    if (this.state.evaluations.length > 0) {
      duplicateFlag = this.state.evaluations.slice(this.state.evaluations.length - count, this.state.evaluations.length)[0].id === EvaluationStore.recentEvaluations[0].id;
    }

    if (!duplicateFlag) {
      let newRecentEvals = this.state.evaluations.slice(0, this.state.evaluations.length).concat(EvaluationStore.recentEvaluations);

      this.setState({ evaluations: newRecentEvals, loading: false });
    }
  }

  _renderEvalItems() {
    return this.state.evaluations.map((item, idx) => {
      return (
        <Link key={item.id} to={`/course/${item.course_id}`}>
          <SingleEvaluation key={idx} evaluation={this.state.evaluations[idx]}/>
        </Link>
      );
    })
  }

  render() {
    let loading = this.state.loading ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    return (
      <div className="panel panel-default border-normal">
        <div className="panel-heading">
          <span className="noto" style={{fontSize: '17px', color: "#27B3AD", fontWeight: 'bold'}}>최신 강의평가 &nbsp;</span>
          <span className="roboto" style={{fontSize: '15px', color: "#c6c6c6"}}>Recent Evaluations</span>
        </div>
        {this._renderEvalItems()}
        {loading}
      </div>
    );
  }
};
