'use strict';

import React from 'react';
import Modal from 'react-modal';

import CommentActionCreators from '../../actions/CommentActionCreators';

import CommonStore from '../../stores/CommonStore';
import CommentStore from '../../stores/CommentStore';

import ActionTypes from '../../constants/ActionTypes';
import ViewConstants from '../../constants/ViewConstants';

const validationMsg = ViewConstants.validationMessages;

export default class CommentReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
  }

  componentWillMount() {
    this.reportListener = this._onReported.bind(this);
    CommentStore.addChangeListener(this.reportListener);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this.reportListener);
  }

  _onChangeBody(e) {
    this.setState({ body: e.target.value });
  }

  _report() {
    CommentActionCreators.reportComment(this.props.commentId, this.state.body);
    this.props.closeModal();
  }

  _onReported() {
    if (CommentStore.actionType === ActionTypes.REQUEST_COMMENT_REPORT_SUCCESS && CommentStore.getReportedCmtId() === this.props.commentId) {
      msgEmitter.success(validationMsg.REPORT_COMMENT_SUCCESS);
    }
  }

  render() {
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.modalOpened}
        onRequestClose={this.props.closeModal}
        style={{content : {height: '455px'}}}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.props.closeModal}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">댓글 신고하기</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea className="form-control noto" style={{ width: '100%', border: '1px solid #ADADAD', borderRadius: '5.5px', fontWeight: 300}} cols="30" rows="10" onChange={this._onChangeBody.bind(this)} placeholder="" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this._report.bind(this)}>신고</button>
            <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }
};
