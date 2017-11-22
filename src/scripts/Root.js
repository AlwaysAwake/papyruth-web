'use strict';

import React from "react";
import { Link } from "react-router";
import AlertContainer from './components/Alert/Alert';
import history from './history';

import CommonActionCreators from './actions/CommonActionCreators';

import CommonStore from './stores/CommonStore';
import AuthStore from './stores/AuthStore';

import ActionTypes from './constants/ActionTypes';
const relatedActionTypes = [
  ActionTypes.REQUEST_SIGNIN_USER_SUCCESS,
  ActionTypes.REQUEST_SIGNUP_USER_SUCCESS,
  ActionTypes.REQUEST_SIGNIN_USER_ERROR,
  ActionTypes.REQUEST_SIGNUP_USER_ERROR,
  ActionTypes.REQUEST_SIGNOUT_USER,
  ActionTypes.REQUEST_SIGNOUT_USER_ERROR
];

import Sidebar from './components/Sidebar/Sidebar';
import Searchbar from './components/Searchbar/Searchbar';
import FavoriteCourses from './components/FavoriteCourses/FavoriteCourses'
import Terms from './components/Terms/Terms';


export default class Root extends React.Component {
  constructor() {
    super();
    this.alertOptions = {
      offset: 50,
      position: "bottom left",
      theme: "dark",
      time: 5000,
      transition: "fade"
    },
    this.state = {
      userSignedIn: AuthStore.isSignedIn(),
      barFlag: 0,
      modalOpened: false
    };
    CommonActionCreators.getGlobalInfo();
  }

  _getSigninState() {
    return {
      userSignedIn: AuthStore.isSignedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onSigninChange.bind(this);
    AuthStore.addChangeListener(this.changeListener);
  }

  _onSigninChange() {
    if (relatedActionTypes.indexOf(AuthStore._actionType) !== -1) {
      let userSignedInState = this._getSigninState();
      if (process.env.NODE_ENV === 'dev')
        console.log("*** App onSigninChange event: signedIn=", userSignedInState.userSignedIn);

      this.setState(userSignedInState, () => {
        if (userSignedInState.userSignedIn) {
          // TODO: Redirect to where user originally wants to go
          history.replaceState(null, '/');
        } else {
          history.replaceState(null, '/signin');
        }
      });
    }
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.changeListener);
  }

  _openModal(target, e) {
    e.preventDefault();
    CommonActionCreators.getModalContents(target);
    this.setState({ modalOpened: true });
    e.stopPropagation();
  }

  _closeModal() {
    this.setState({ modalOpened: false });
  }

  _toggleSearchBar() {
    if (this.state.barFlag === 1) this.setState({barFlag: 0});
    else this.setState({barFlag: 1});
  }

  _toggleFavoriteBar() {
    if (this.state.barFlag === 2) this.setState({barFlag: 0});
    else this.setState({barFlag: 2});
  }

  render() {
    const { location } = this.props;
    let sideBar, searchBar, routeHandler;
    let userSignedInState = this._getSigninState();
    if (userSignedInState.userSignedIn) {
      sideBar = <Sidebar openModal={this._openModal.bind(this)} closeModal={this._closeModal.bind(this)} searchFlag={this._toggleSearchBar.bind(this)} favoriteFlag={this._toggleFavoriteBar.bind(this)} />;

      if (this.state.barFlag === 1) {
        searchBar = <Searchbar />;
        routeHandler = <div className="col-xs-8">{this.props.children}</div>;
      } else if (this.state.barFlag === 2) {
        searchBar = <FavoriteCourses />;
        routeHandler = <div className="col-xs-8">{this.props.children}</div>;
      } else {
        searchBar = undefined;
        routeHandler = <div className="col-xs-12">{this.props.children}</div>;
      }
    } else {
      sideBar, searchBar = undefined;
      routeHandler = <div id="signin-wrapper" className="col-xs-12 no-padding">{this.props.children}</div>;
    }
    return (
      <section id="main-wrapper" className={"theme-default " + (location.pathname.indexOf('useapp') > -1 ? 'mobile' : '')}>
        <Terms modalOpened={this.state.modalOpened} closeModal={this._closeModal.bind(this)} />
        {sideBar}
	      <div className="main-content-wrapper" style={{marginRight: '0px', paddingTop: '0px'}}>
		      <div className="row">
		        <div className="col-xs-4" id="search-box-wrapper" style={{top: 0}}>
              {searchBar}
		        </div>
            {routeHandler}
		      </div>
	      </div>
        <AlertContainer ref={(a) => global.msgEmitter = a} {...this.alertOptions} />
	    </section>
    );
  }
};
