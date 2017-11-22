'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthStore from './stores/AuthStore';

import Root from './Root';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import SearchBar from './components/Searchbar/Searchbar';
import CreateEvaluation from './components/Evaluation/CreateEvaluation';
import UpdateEvaluation from './components/Evaluation/UpdateEvaluation';
import UserInfo from './components/UserInfo/UserInfo';
import MyEvaluations from './components/UserInfo/MyEvaluations';
import MyComments from './components/UserInfo/MyComments';
import ChangePassword from './components/UserInfo/ChangePassword';
import ChangeProfile from './components/UserInfo/ChangeProfile';
import Course from './components/Course/Course';
import MandatoryEvaluationRequired from './components/Evaluation/MandatoryEvaluationRequired';
import EmailAuth from './components/EmailAuth/EmailAuth';
import UnivEmailAuth from './components/EmailAuth/UnivEmailAuth';
import FindPassword from './components/Common/FindPassword';
import UseApp from './components/UseApp/UseApp';
import NotFound from './components/Common/NotFound';


function requireAuth(nextState, replaceState) {
  if (process.env.NODE_ENV === 'dev')
    console.log("*** transition for authenticated page. Next transition path: ", nextState.location.pathname, 'signed in: ', AuthStore.isSignedIn());

  if (!AuthStore.isSignedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signin');
  }
}

function suggestApp(nextState, replaceState) {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('android') > -1 || ua.indexOf('iphone') > -1 || ua.indexOf('mobile') > -1) {
    replaceState(null, '/useapp');
  }
}

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} onEnter={requireAuth} />
    <Route path="signin" onEnter={suggestApp} component={Signin} />
    <Route path="signup" component={Signup} />
    <Route path="find/password" component={FindPassword} />
    <Route path="evaluation/write(/:course_id)" component={CreateEvaluation} onEnter={requireAuth} />
    <Route path="evaluation/update/:course_id/:evaluation_id" component={UpdateEvaluation} onEnter={requireAuth} />
    <Route path="evaluation/required/:count" component={MandatoryEvaluationRequired} onEnter={requireAuth} />
    <Route path="user/info" component={UserInfo} onEnter={requireAuth} reload={true} />
    <Route path="user/password" component={ChangePassword} onEnter={requireAuth} />
    <Route path="user/profile" component={ChangeProfile} onEnter={requireAuth} />
    <Route path="user/evaluations" component={MyEvaluations} onEnter={requireAuth} />
    <Route path="user/comments" component={MyComments} onEnter={requireAuth} />
    <Route path="user/auth/email" component={EmailAuth} onEnter={requireAuth} />
    <Route path="user/auth/univ_email" component={UnivEmailAuth} onEnter={requireAuth} />
    <Route path="course/:courseID" component={Course} onEnter={requireAuth} />
    <Route path="useapp" component={UseApp} />
    <Route path="*" component={NotFound} />
  </Route>
);
