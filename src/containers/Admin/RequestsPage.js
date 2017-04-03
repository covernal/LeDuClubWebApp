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
      sendingRequest: false,
      requestsData: DummyData.REQUESTS
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
                  <h4 className="page-title">配送调度</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <RequestSearchForm />
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
                <button type="button" className="btn btn-default waves-effect w-md waves-light " data-toggle="modal" data-target="#custom-width-modal">显示更多</button>
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
