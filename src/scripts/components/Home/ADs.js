'use strict';

import React from 'react';

class ADs extends React.Component {
  render() {
    return (
      <div className="panel panel-default" style={{marginBottom: '5px'}}>
        <div className="panel-heading">
          <h3 className="panel-title">Ad</h3>
        </div>
        <div className="panel-body">
          <div className="panel panel-solid-default widget-mini">
            <div className="panel-body">
              <span className="total text-center">Ads</span>
              <span className="title text-center">Here</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ADs;
