'use strict';

import React from 'react';
import { Link } from 'react-router'
import _ from 'underscore';

import EvaluationActionCreators from '../../actions/EvaluationActionCreators';

import EvaluationStore from '../../stores/EvaluationStore';

import ViewConstants from '../../constants/ViewConstants';
const CONTENTS_COUNT = ViewConstants.UserInfo.maximumContentsCount;
const CONTENTS_LENGTH = ViewConstants.UserInfo.maximumContentsLength;

import LoadingComponent from '../Common/LoadingComponent';
import MyEvaluationsItem from './MyEvaluationsItem';
import ItemsNone from './ItemsNone';

export default class MyEvauations extends React.Component {

  constructor() {
    super();
    EvaluationActionCreators.getMyEvals(1);
    this.state = {
      myEvals: [],
      loadingInit: true,
      loadingScroll: false,
      lastPage: false
    };
  }

  componentWillMount() {
    this.evalListener = this._onMyEvalsLoad.bind(this);
    this.scrollListener = this._onScroll.bind(this);
    EvaluationStore.addChangeListener(this.evalListener);
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    EvaluationStore.removeChangeListener(this.evalListener);
    window.removeEventListener('scroll', this.scrollListener);
  }

  _onScroll() {
    if(window.scrollY > 0) {
      var scrollPercent = (window.scrollY + window.innerHeight) / window.document.body.scrollHeight * 100;

      if (scrollPercent >= 100 && this.state.lastPage === false) {
        this.setState({ loadingScroll: true });
        let page = Math.ceil(this.state.myEvals.length / 10) + 1;
        EvaluationActionCreators.getMyEvals(page);
        this._onMyEvalsLoad.bind(this);
      }
    }
  }

  _onMyEvalsLoad() {
    let newMyEvals = this.state.myEvals.slice(0, this.state.myEvals.length).concat(EvaluationStore.myEvals);

    if (EvaluationStore.myEvals.length === 0)
      this.setState({ lastPage: true });

    this.setState({ myEvals: newMyEvals, loadingInit: false, loadingScroll: false });
  }

  _renderMyEvals() {
    if (this.state.loadingInit) {
      return (<LoadingComponent message={"Loading..."} display={"block"} />);
    }
    else {
      if (this.state.myEvals.length === 0) {
        return <ItemsNone contentType="evaluation" />;
      } else {
        return this.state.myEvals.slice(0, this.state.myEvals.length).map((eachEval, idx) => {
          let lecTitle = eachEval.lecture_name;
          if (lecTitle.length > CONTENTS_LENGTH)
            lecTitle = lecTitle.substring(0, CONTENTS_LENGTH) + ' ...';
          return (
            <Link key={eachEval.id} to={`/course/${eachEval.course_id}`}>
              <MyEvaluationsItem evaluation={eachEval} index={idx} />
            </Link>
          );
        });
      }
    }
  }

  render() {
    let loadingScroll = this.state.loadingScroll ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    return (
      <div className="panel panel-default panel-card border-normal">
        <div className="panel-heading">
          <span className="panel-title noto no-spacing">내가 작성한 강의평가</span>
          <span className="roboto panel-subtitle">MY EVALUATIONS</span>
        </div>
        {this._renderMyEvals()}
        {loadingScroll}
      </div>
    );
  }
};
