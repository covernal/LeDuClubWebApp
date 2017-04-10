import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import AdminRequestItem from '../../components/Widgets/LeduCard/AdminRequestItem';
import RequestSearchForm from '../../components/Widgets/LeduForm/Admin/RequestSearchForm';
import {CommonUserActions, AdminUserActions} from '../../actions';

class RequestsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: true,      
      skip: 0,
      hasMoreRequests: true,
      isLoadingMore: false,
      requests: [],
      warehouses: [],
      belongToWarehouseId: ''
    };

    this.searchRequests = this.searchRequests.bind(this);
    this.loadMoreRequests = this.loadMoreRequests.bind(this);
    this._loadRequests = this._loadRequests.bind(this);
  }

  searchRequests(belongToWarehouseId) {
    console.log(belongToWarehouseId);
    this.setState({
      skip: 0,
      requests: [],
      isLoadingMore: false,
      hasMoreRequests: true,
      belongToWarehouseId: belongToWarehouseId
    }, () => {
      this._loadRequests();
    });
  }

  componentDidMount() {
    this.props.loadWarehouses({
      cb: () => {
        this.setState({
          sendingRequest: false
        });        

        if(this.props.commonServerError === null) {
          this.setState({
            warehouses: this.props.warehouses
          });
        }
      }
    });

    this._loadRequests();
  }

  loadMoreRequests() {
    this.setState({
      isLoadingMore: true
    }, () => {
      this._loadRequests();
    });
  }

  _loadRequests() {
    this.props.loadRequests({
      data: {
        skip: this.state.skip,
        belongToWarehouseId: this.state.belongToWarehouseId
      },
      cb: () => this.loadMoreCallback()
    });
  }

  loadMoreCallback() {
    if(this.props.serverError != null) {
      this.setState({
        serverError: this.props.serverError,
        isLoadingMore: false
      });
      return;
    }

    if(this.props.requests.length > 0){
      let limit = 0;
      this.props.requests.forEach((request) => {
        let existObj = Find(this.state.requests, (l) => {
          return l.objectId == request.objectId;
        });
        if(existObj == undefined) {
          this.state.requests.push(request);
          limit++;
        }
      });

      this.setState({
        skip: this.state.skip + limit,
        requests: this.state.requests,
        isLoadingMore: false
      });
    }else{
      this.setState({
        hasMoreRequests: false,
        isLoadingMore: false
      });
    }
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
          <SubHeader />
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
                <RequestSearchForm searchRequests={this.searchRequests} warehouses={this.state.warehouses}/>
              </div>
            </div>
            <hr/>
            {
              this.state.requests.map((item, idx) =>
                <AdminRequestItem key={`request-${idx}`} item={item} handleAssign={this.handleAssign}/>
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

const mapStateToProps = (state) => {
  return {
    warehouses: state.CommonUserReducer.warehouses,
    requests: state.AdminUserReducer.requests,
    serverError: state.AdminUserReducer.error,
    commonServerError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRequests: (req) => {
      if(req.data.belongToWarehouseId === "") {
        delete req.data.belongToWarehouseId;
      }
      dispatch(AdminUserActions.adminLoadRequests(req.data, req.cb));
    },

    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage);