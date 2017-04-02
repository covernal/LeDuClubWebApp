import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MembersList from '../../components/Layouts/Admin/MembersList';
import MemberSearchForm from '../../components/Widgets/LeduForm/Admin/MemberSearchForm';

class MembersPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };
  }

  render() {
    if (!this.props) {
      return null;
    }

    let overlayClass = (this.state.sendingRequest) ? 'endorsse-overlay show' : 'endorsse-overlay';

    return (
      <div>
        <header id="topnav">
          <Header isPublic={false} />
          <SubHeader type="admin" />
        </header>     

        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">会员管理</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <MemberSearchForm />
              </div>
            </div>            
            <MembersList />

            <div className="row">
              <div className="col-md-12">                
                <div className="text-center">
                  <button type="button" className="btn btn-default waves-effect w-md waves-light m-t-0 m-b-30" data-toggle="modal" data-target="#custom-width-modal">Load More</button>
                </div>                
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MembersPage;
