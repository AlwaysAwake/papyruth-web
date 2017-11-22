'use strict';

import React from 'react';
import _ from 'underscore';

import EvaluationActionCreators from '../../actions/EvaluationActionCreators';

import EvaluationStore from '../../stores/EvaluationStore';

import LoadingComponent from '../Common/LoadingComponent';
import EvaluationItem from './EvaluationItem';
import CommentsWrapper from './CommentsWrapper';
import EvaluationsNone from './EvaluationsNone';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';
const evaluationsPerRequest = ViewConstants.Evaluation.EvaluationsWrapper.evaluationsPerRequest;

export default class EvaluationsWrapper extends React.Component {

  constructor(props) {
    super(props);
    EvaluationActionCreators.getCourseEvals(this.props.universityId, this.props.courseID);
    this.state = {
      evaluations: {},
      minID: 0,
      maxID: 0,
      lastEvaluation: false,
      loading: true,
      scrolling: false,
      moreButtonClickedId: -1,
      moreButtonClickedItem: ''
    };
  }

  componentDidMount() {
    this.changeListener = this._onCourseEvalsLoad.bind(this);
    EvaluationStore.addChangeListener(this.changeListener);
    this.scrollListener = this._onScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
    this._onClickMore = this._onClickMore.bind(this);
  }

  componentWillUnmount() {
    EvaluationStore.removeChangeListener(this.changeListener);
    window.removeEventListener('scroll', this.scrollListener);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courseID !== this.props.courseID) {
      this.setState({
        evaluations: {},
        minID: 0,
        maxID: 0,
        lastEvaluation: false,
        loading : true,
        scrolling: false
      });

      EvaluationActionCreators.getCourseEvals(nextProps.universityId, nextProps.courseID);
    }
  }

  _onScroll() {
    if (window.scrollY > 0) {
      var scrollPercent = (window.scrollY + window.innerHeight) / window.document.body.scrollHeight * 100;

      if (scrollPercent >= 100 && (!this.state.scrolling && !this.state.lastEvaluation)) {
        this.setState({ scrolling: true });
        EvaluationActionCreators.getCourseEvals(this.props.universityId, this.props.courseID, this.state.minID - 1);
      }
    }
  }

  _onCourseEvalsLoad() {
    if (EvaluationStore.getUpdateFlag() === true)
      EvaluationActionCreators.getCourseEvals(this.props.universityId, this.props.courseID);

    if (EvaluationStore.actionType === ActionTypes.REQUEST_COURSE_EVALUATIONS_SUCCESS) {
      let evaluations = this.state.evaluations;
      let newEvaluations = EvaluationStore.getCourseEvaluations();

      if (Object.keys(newEvaluations).length > 0) {
        evaluations = Object.assign(evaluations, newEvaluations);
        let minID = Object.keys(evaluations)[0];
        let maxID = Object.keys(evaluations)[Object.keys(evaluations).length - 1];

        if (Object.keys(newEvaluations).length < evaluationsPerRequest) {
          this.setState({ lastEvaluation: true });
        }

        this.setState({ evaluations, minID, maxID, loading: false, scrolling: false });
      } else {
        this.setState({ lastEvaluation: true, loading: false, scrolling: false });
      }
    }
  }

  _upVote(evaluationID, flag) {
    let evaluations = this.state.evaluations;

    if (flag === 1) {
      evaluations[evaluationID].up_vote_count--;
      evaluations[evaluationID].request_user_vote = undefined;
      EvaluationActionCreators.voteEvalCancel(evaluationID);
    }
    else {
      if (evaluations[evaluationID].request_user_vote == 0)
        evaluations[evaluationID].down_vote_count--;

      evaluations[evaluationID].up_vote_count++;
      evaluations[evaluationID].request_user_vote = 1;

      EvaluationActionCreators.voteEval(evaluationID, true);
    }

    this.setState({ evaluations });
  }

  _downVote(evaluationID, flag) {
    let evaluations = this.state.evaluations;

    if (flag === 0) {
      evaluations[evaluationID].down_vote_count--;
      evaluations[evaluationID].request_user_vote = undefined;
      EvaluationActionCreators.voteEvalCancel(evaluationID);
    }
    else {
      if (evaluations[evaluationID].request_user_vote == 1)
        evaluations[evaluationID].up_vote_count--;

      evaluations[evaluationID].down_vote_count++;
      evaluations[evaluationID].request_user_vote = 0;

      EvaluationActionCreators.voteEval(evaluationID, false);
    }

    this.setState({ evaluations });
  }

  _upVoteUsers(evaluation_id) {
    EvaluationActionCreators.voteEvalUsers(evaluation_id);
  }

  _downVoteUsers(evaluation_id) {
    EvaluationActionCreators.voteEvalUsers(evaluation_id);
  }

  _report(evaluation_id, body) {
    EvaluationActionCreators.reportEval(evaluation_id, body);
  }

  _onClickMore(id, item) {
    this.setState({ moreButtonClickedId: id, moreButtonClickedItem: item });
  }

  render() {
    let loading = this.state.loading ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;
    let scrolling = this.state.scrolling ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    let evals;
    if (!_.isEmpty(this.state.evaluations)) {
      evals = Object.keys(this.state.evaluations).reverse().map((value, index) => {
        return (
          <div key={index}>
            <EvaluationItem
              evaluation={this.state.evaluations[value]}
              index={index}
              courseID={this.props.courseID}
              deleteEval={this.props.deleteEval}
              onClickMore={this._onClickMore}
              clickedId={this.state.moreButtonClickedId}
              clickedItem={this.state.moreButtonClickedItem}
              upVote={this._upVote.bind(this)}
              downVote={this._downVote.bind(this)}
              upVoteUsers={this._upVoteUsers.bind(this)}
              downVoteUsers={this._downVoteUsers.bind(this)}
              report={this._report.bind(this)} />
            {
              this.state.evaluations[value].university_confirmation_needed
              ? ""
              : <CommentsWrapper
                  evaluation={this.state.evaluations[value]}
                  index={index}
                  comments={this.state.evaluations[value].comments.slice(0,this.state.evaluations[value].comments.length).reverse()}
                  onClickMore={this._onClickMore}
                  clickedId={this.state.moreButtonClickedId}
                  clickedItem={this.state.moreButtonClickedItem} />
            }
          </div>
        )
      });
    } else {
      evals = <EvaluationsNone />;
    }

    return (
      <section className="panel panel-default chat-widget">
        <div className="panel-body" style={{paddingTop: '0px'}}>
          {loading}
          {this.state.loading ? "" : evals}
          <div style={{paddingTop: '100px'}}>
            {scrolling}
          </div>
        </div>
      </section>
    );
  }
};
