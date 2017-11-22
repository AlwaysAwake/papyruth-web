'use strict';

import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="panel-body wht-bg">
        <h4 className="gen-case">
          <div className="input-append">
            <div className="row">
              <div className="col-xs-9">
                <input type="text" className="form-control" placeholder="검색어를 입력해주세요."
                  onChange={this.props.onChange}
                  onKeyDown={this.props.triggerSearch} />
              </div>
              <div className="col-xs-3" id="search-result-toggle-button">
                <button onClick={this.props.triggerSearch} type="button" className="btn" style={{borderRadius: '5px'}}>
                  <span className="noto" style={{fontSize: "15px", color: "#FFFFFF"}}>검색</span>
                </button>
              </div>
            </div>
          </div>
        </h4>
      </header>
    );
  }
};
