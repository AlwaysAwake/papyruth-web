'use strict';

import React from 'react';
import Modal from 'react-modal';

import CommonStore from '../../stores/CommonStore';

export default class TermsAndLicenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContents: {}
    };
  }

  componentWillMount() {
    this.changeListener = this._onContentsLoad.bind(this);
    CommonStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    CommonStore.removeChangeListener(this.changeListener);
  }

  _onContentsLoad() {
    this.setState({
      modalContents: CommonStore.modalContents
    });
  }

  render() {
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.modalOpened}
        onRequestClose={this.props.closeModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.props.closeModal}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">{this.state.modalContents.name}</h4>
          </div>
          <div className="modal-body">
            {
              this.state.modalContents.body ?
                this.state.modalContents.body.split("\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })
              : ''
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }
};
