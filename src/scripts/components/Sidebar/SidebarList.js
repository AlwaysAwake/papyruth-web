'use strict';

import React from 'react';

import SidebarItem from './SidebarItem';

export default class SidebarList extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderSidebarItem() {
    return this.props.properties.map((item, i) => {
      if (item.flag === "search")
        return <SidebarItem key={i} item={item} searchFlag={this.props.searchFlag} />;
      else if (item.flag === "favorite")
        return <SidebarItem key={i} item={item} favoriteFlag={this.props.favoriteFlag} />;
      else
        return <SidebarItem key={i} item={item} />;
    });
  }

  render() {
    return (
      <nav>
        <div className="sidebar-title">
          <span className="roboto">{this.props.name}</span>
        </div>
        <ul className="nav nav-pills nav-stacked" style={{marginLeft: '0px', marginRight: '0px'}}>
          {this._renderSidebarItem()}
        </ul>
      </nav>
    );
  }
};
