import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import AdminRequestItem from '../../components/Widgets/LeduCard/AdminRequestItem';
import RequestSearchForm from '../../components/Widgets/LeduForm/Admin/RequestSearchForm';

//Dummy data
import DummyData from '../../constants/DummyData';

class RequestsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      skip: 0,
      hasMoreRequests: true,
      isLoadingMore: false,
      isInitTable: true,

      sendingRequest: false,
      requestsData: DummyData.REQUESTS
    };

    this.searchRequests = this.searchRequests.bind(this);
    this.loadMoreRequests = this.loadMoreRequests.bind(this);
  }

  searchRequests(store) {
    this.setState({
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
      });
    });
  }

  loadMoreRequests() {

  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreRequests) ? 'disabled' : '';
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
                  <h4 className="page-title">配送调度</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <RequestSearchForm searchRequests={this.searchRequests} />
              </div>
            </div>
            <hr/>
            {
              this.state.requestsData.map((item, idx) =>
                <AdminRequestItem key={`request-${idx}`} item={item} />
              )
            }
            <div className="row">
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreRequests}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreRequests) ? '显示更多' : '没有更多'}</button>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

RequestsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default RequestsPage;
