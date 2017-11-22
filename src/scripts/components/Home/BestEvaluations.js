'use strict';

import React from 'react';

import SingleEvaluation from './SingleEvaluation';

class BestEvaluations extends React.Component {
  render() {
    return (
      <div className="panel panel-default" style={{marginBottom: '5px'}}>
        <div className="panel-heading" style={{position: 'relative'}}>
          <h3 className="panel-title roboto">Best Evaluations</h3>
          <div className="actions pull-right" style={{top:'9px', right:'12px'}}>
            <i className="fa fa-chevron-left"></i>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        <div className="panel-body">
          <SingleEvaluation />
        </div>
      </div>
    );
  }
}

export default BestEvaluations;
