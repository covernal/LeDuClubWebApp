import React from 'react';
import {Route} from 'react-router';
import App from './App';

import AdminBooksPage from './containers/Admin/BooksPage';
import AdminMembersPage from './containers/Admin/MembersPage';
import AdminRequestsPage from './containers/Admin/RequestsPage';
import AdminBookDetailsPage from './containers/Admin/BookDetailsPage';

import MyRequestPage from './containers/Postman/MyRequestPage';

import LoginPage from './containers/Public/LoginPage';

import MemberSignupPage from './containers/Member/SignupPage';
import MemberBooksPage from './containers/Member/BooksPage';
import MemberBookDetailsPage from './containers/Member/BookDetailsPage';

import ErrorPage from './containers/404/ErrorPage';
import Utils from './utils';

export default (
  <Route component={App}>
	<Route path="/" component={LoginPage}/>
	<Route path="/login" component={LoginPage}/>

	<Route path="/signup" component={MemberSignupPage}/>
	<Route path="/member/books" component={MemberBooksPage}/>
	<Route path="/member/book/:id" component={MemberBookDetailsPage}/>
	
	<Route path="/admin/books" component={AdminBooksPage}/>
	<Route path="/admin/members" component={AdminMembersPage}/>
	<Route path="/admin/requests" component={AdminRequestsPage}/>	
	<Route path="/admin/book/:id" component={AdminBookDetailsPage}/>

	<Route path="/postman/my-request" component={MyRequestPage}/>
	<Route path="*" component={ErrorPage} />
  </Route>
);
