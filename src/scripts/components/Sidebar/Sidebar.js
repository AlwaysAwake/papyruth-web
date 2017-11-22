'use strict';

import React from 'react';
import { Link } from 'react-router';

import SidebarHeader from './SidebarHeader';
import SidebarList from './SidebarList';
import SignoutButton from './SignoutButton';
import AppLink from './AppLink';

import ViewConstants from '../../constants/ViewConstants';
const sidebarItems = ViewConstants.Sidebar.items;

const TERMS = 1;
const PRIVACY_POLICY = 2;


export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderSidebarList() {
    return sidebarItems.map((item, idx) => {
      return <SidebarList key={idx} name={item.name} properties={item.properties} searchFlag={this.props.searchFlag} favoriteFlag={this.props.favoriteFlag} />;
    })
  }

  render() {
    return (
      <aside className="sidebar sidebar-left" style={{width: '235px', position: 'fixed' }}>
        <SidebarHeader />
        {this._renderSidebarList()}
        <SignoutButton />
        <hr style={{ borderColor: '#f1f1f1', width:'100%', marginTop:'20px', marginBottom:'20px' }} />
        <p className="text-center">
          <a href="#" onClick={this.props.openModal.bind(null, TERMS)}>
            <span className="noto" style={{fontSize: '14px', color: '#666'}}>약관</span>
          </a>
          &nbsp;/&nbsp;
          <a href="#" onClick={this.props.openModal.bind(null, PRIVACY_POLICY)}>
            <span className="noto" style={{fontSize: '14px', color: '#666'}}>개인정보 취급방침</span>
          </a>
        </p>
        <p className="text-center roboto" style={{fontSize: '12px !important', color: '#adadad !important'}}>
          &copy;&nbsp;Team Montserrat
          <br />
          <a href="mailto:contact@papyruth.com" target="_top">contact@papyruth.com</a>
        </p>
        <AppLink link="https://play.google.com/store/apps/details?id=com.papyruth.android" imgPath="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/applink/google-store-button.png" />
        <AppLink link="https://appsto.re/kr/bG3k_.i" imgPath="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/applink/apple-store-button.png" />
      </aside>
    );
  }
};
