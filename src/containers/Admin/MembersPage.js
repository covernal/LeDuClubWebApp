import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MembersList from '../../components/Layouts/Admin/MembersList';
import MemberSearchForm from '../../components/Widgets/LeduForm/Admin/MemberSearchForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

//Dummy data
import DummyData from '../../constants/DummyData';

class MembersPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,
      
      skip: 0,
      hasMoreMembers: true,
      isLoadingMore: false,
      isInitTable: true,
      membersData: DummyData.MEMBERS,

      searchData: null
    };

    this.searchMembers = this.searchMembers.bind(this);
    this.loadMoreMembers = this.loadMoreMembers.bind(this);
  }

  searchMembers(opt) {
    console.log(opt);
    this.setState({
      searchData: opt,
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
      });
    });
  }

  loadMoreMembers() {

  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreMembers) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

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
                <MemberSearchForm searchMembers={this.searchMembers}/>
              </div>
            </div>            
            <MembersList isInitTable={this.state.isInitTable} />

            <div className="row">
              <div className="col-md-12">                
                <div className="text-center">
                  <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light m-t-0 m-b-30" onClick={this.loadMoreMembers}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreMembers) ? '显示更多' : '没有更多'}</button>
                </div>                
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <LeduOverlay
          overlayClass={overlayClass}
          message="Please wait..."
        />            
      </div>
    );
  }
}

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MembersPage;
