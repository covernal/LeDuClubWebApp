import React from 'react';
import {Route} from 'react-router';
import App from './App';

import AdminMembersPage from './containers/Admin/MembersPage';
import AdminRequestsPage from './containers/Admin/RequestsPage';
import AdminBookDetailsPage from './containers/Admin/BookDetailsPage';

import MyRequestPage from './containers/Postman/MyRequestPage';

import LoginPage from './containers/Public/LoginPage';
import PublicBooksPage from './containers/Public/BooksPage';
import PublicBookDetailsPage from './containers/Public/BookDetailsPage';

import MemberSignupPage from './containers/Member/SignupPage';
import MemberForgotPwdPage from './containers/Member/ForgotPwdPage';
import MemberMyRequestsPage from './containers/Member/MyRequestsPage';
import MemberMyBooksPage from './containers/Member/MyBooksPage';
import MyProfilePage from './containers/Member/MyProfilePage';

import ErrorPage from './containers/404/ErrorPage';
import Utils from './utils';

let requireAuth = (nextState, replace) => {
  if(!Utils.AuthHelper.isLoggedIn()){
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

let requirePostmanAuth = (nextState, replace) => {
  if(!Utils.AuthHelper.isLoggedIn() || !Utils.AuthHelper.roleCheck('postman')){
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

let requireMemberAuth = (nextState, replace) => {
  if(!Utils.AuthHelper.isLoggedIn() || !Utils.AuthHelper.roleCheck('member')){
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

let requireAdminAuth = (nextState, replace) => {
  if(!Utils.AuthHelper.isLoggedIn() || !Utils.AuthHelper.roleCheck('admin')){
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};


export default (
  <Route component={App}>
	<Route path="/" component={LoginPage}/>
	<Route path="/login" component={LoginPage}/>
	<Route path="/browsebooks" component={PublicBooksPage}/>
	<Route path="/book/:id" component={PublicBookDetailsPage}/>	

	<Route path="/signup" component={MemberSignupPage}/>
	<Route path="/forgot-pwd" component={MemberForgotPwdPage}/>
	<Route path="/member/my-requests" component={MemberMyRequestsPage} onEnter={requireMemberAuth}/>
	<Route path="/member/my-books" component={MemberMyBooksPage} onEnter={requireMemberAuth}/>
	<Route path="/my-profile" component={MyProfilePage} onEnter={requireAuth}/>	
	
	<Route path="/admin/members" component={AdminMembersPage} onEnter={requireAdminAuth}/>
	<Route path="/admin/requests" component={AdminRequestsPage} onEnter={requireAdminAuth}/>
	<Route path="/admin/book/:id" component={AdminBookDetailsPage} onEnter={requireAdminAuth}/>
  <Route path="/admin/book" component={AdminBookDetailsPage} onEnter={requireAdminAuth}/>

	<Route path="/postman/my-request" component={MyRequestPage} onEnter={requirePostmanAuth}/>
	<Route path="*" component={ErrorPage} />
  </Route>
);
