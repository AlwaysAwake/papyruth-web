'use strict';

import React from 'react';
import { Link } from 'react-router'
import _ from 'underscore';

import CommentActionCreators from '../../actions/CommentActionCreators';

import CommentStore from '../../stores/CommentStore';

import ViewConstants from '../../constants/ViewConstants';
const CONTENTS_COUNT = ViewConstants.UserInfo.maximumContentsCount;
const CONTENTS_LENGTH = ViewConstants.UserInfo.maximumContentsLength;

import LoadingComponent from '../Common/LoadingComponent';
import MyCommentsItem from './MyCommentsItem';
import ItemsNone from './ItemsNone';

export default class MyComments extends React.Component {

  constructor() {
    super();
    CommentActionCreators.getMyComments(1);
    this.state = {
      myComments: [],
      loadingInit: true,
      loadingScroll: false,
      lastPage: false
    };
  }

  componentWillMount() {
    this.commentListener = this._onMyCommentsLoad.bind(this);
    this.scrollListener = this._onScroll.bind(this);
    CommentStore.addChangeListener(this.commentListener);
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this.commentListener);
    window.removeEventListener('scroll', this.scrollListener);
  }

  _onScroll() {
    if(window.scrollY > 0) {
      let scrollPercent = (window.scrollY + window.innerHeight) / window.document.body.scrollHeight * 100;

      if ((scrollPercent >= 100) && (this.state.lastPage === false)) {
        this.setState({ loadingScroll: true });
        let page = Math.ceil(this.state.myComments.length / 10) + 1
        CommentActionCreators.getMyComments(page);
        this._onMyCommentsLoad.bind(this);
      }
    }
  }

  _onMyCommentsLoad() {
    let newMyComments = this.state.myComments.slice(0, this.state.myComments.length).concat(CommentStore.myComments);

    if (CommentStore.myComments.length === 0)
      this.setState({ lastPage: true });

    this.setState({ myComments: newMyComments, loadingInit: false, loadingScroll: false });
  }

  _renderMyComments() {
    if (this.state.loadingInit) {
      return (<LoadingComponent message={"Loading..."} display={"block"} />);
    }
    else {
      if (this.state.myComments.length === 0) {
        return <ItemsNone contentType="comment" />;
      } else {
        return this.state.myComments.slice(0, this.state.myComments.length).map((cmt, idx) => {
          let lecTitle = cmt.lecture_name;
          if (lecTitle.length > CONTENTS_LENGTH)
            lecTitle = lecTitle.substring(0, CONTENTS_LENGTH) + ' ...';
          return (
            <Link key={idx} to={`/course/${cmt.course_id}`}>
              <MyCommentsItem comment={cmt} index={idx} />
            </Link>
          );
        });
      }
    }
  }

  render() {
    let loadingScroll = this.state.loadingScroll ? <LoadingComponent message={"Loading..."} display={"block"} /> : <LoadingComponent message={"Loading..."} display={"none"}/>;

    return (
      <div id="mycomments-wrapper" className="panel panel-default panel-card border-normal">
        <div className="panel-heading">
          <span className="panel-title noto no-spacing">내가 작성한 댓글</span>
          <span className="roboto panel-subtitle">MY COMMENTS</span>
        </div>
        {this._renderMyComments()}
        {loadingScroll}
      </div>
    );
  }
};
