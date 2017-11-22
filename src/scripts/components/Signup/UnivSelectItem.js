'use strict';

import React from 'react';
import classNames from 'classnames';

export default class UnivSelectItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: classNames('panel-body', 'hover-non-selected-university')
    };
  }

  _onMouseEnter() {
    this.setState({
      hover: classNames('panel-body', 'hover-selected-university')
    });
  }

  _onMouseLeave() {
    this.setState({
      hover: classNames('panel-body', 'hover-non-selected-university')
    });
  }

  render() {
    return (
      <div className="col-xs-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="noto text-center">
              {this.props.univName}
            </h3>
          </div>
          <div className={this.state.hover}
            onClick={this.props.onClick}
            onMouseEnter={this._onMouseEnter.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            style={{cursor: "pointer"}}>
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <a className="signup-select-university" data-university-id={this.props.univId}>
                  <img src={this.props.univImgPath} alt={this.props.univEngName} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
