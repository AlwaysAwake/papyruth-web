'use strict';

import React from 'react';

export default class SidebarHeader extends React.Component {
  render() {
    return (
      <header id="header" style={{ width: '233px', height: '168px'}}>
        <div style={{textAlign: 'center'}}>
          <a href="/" className="logo" style={{paddingLeft: '0px'}}>
            <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/sidebar/logo.png" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />
          </a>
        </div>
      </header>
    );
  }
};

