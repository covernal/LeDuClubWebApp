import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import AdminRequestItem from '../../components/Widgets/LeduCard/AdminRequestItem';
import RequestSearchForm from '../../components/Widgets/LeduForm/Admin/RequestSearchForm';
import {CommonUserActions, AdminUserActions} from '../../actions';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

class RequestsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,      
      skip: 0,
      hasMoreRequests: true,
      isLoadingMore: false,
      isInitTable: true,
      requests: [],
      warehouses: [],
      belongToWarehouseId: '',
      postmen: [],
      serverError: null
    };

    this.handleAssign = this.handleAssign.bind(this);
    this.searchRequests = this.searchRequests.bind(this);
    this.loadMoreRequests = this.loadMoreRequests.bind(this);
    this._loadRequests = this._loadRequests.bind(this);
  }

  searchRequests(belongToWarehouseId) {
    this.setState({
      skip: 0,
      requests: [],
      isInitTable: true,
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
            warehouses: this.props.warehouses,
            belongToWarehouseId: this.props.warehouses[0].objectId
          });

          this.refs.requestSearchForm.setState({
            belongToWarehouseId: this.props.warehouses[0].objectId
          });          

          this.props.adminLoadPostmen({
            cb: () => {
              this.setState({
                postmen: this.props.postmen
              });
              this._loadRequests();
            }
          });           
        }
      }
    });
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
        isInitTable: false,
        isLoadingMore: false
      });
      return;
    }

    if(this.props.requests.length > 0){
      let limit = 0;
      let tmpRequests = [];
      this.props.requests.forEach((request) => {
        this.props.getUser({
          id: request.memberId,
          cb: () => {
            request['member'] = this.props.userDetails;
            this.props.getBook({
              id: request.bookId,
              cb: () => {
                request['book'] = this.props.book;
                tmpRequests.push(request);

                limit++;              
                if(this.props.requests.length === limit) {
                  let sub_limit = 0;
                  tmpRequests.forEach((r) => {
                    let existObj = Find(this.state.requests, (l) => {
                      return l.objectId == r.objectId;
                    });
                    if(existObj == undefined) {
                      this.state.requests.push(r);
                      sub_limit++;
                    }
                  });

                  this.setState({
                    skip: this.state.skip + limit,
                    requests: this.state.requests,
                    isInitTable: false,
                    isLoadingMore: false
                  });
                }
              }
            });
          }
        });
      });
    }else{
      this.setState({
        isInitTable: false,
        hasMoreRequests: false,
        isLoadingMore: false
      });
    }
  }

  handleAssign(requestId, postmanId) {
    console.log(requestId, postmanId);
    this.setState({
      sendingRequest: true
    }, ()=> {
      this.props.adminAllocateRequestToPostman({
        requestId: requestId,
        postmanId: postmanId,
        cb: () => {
          this.setState({
            sendingRequest: false,
            serverError: this.props.serverError
          });
          if(this.props.serverError === null) {
            this.searchRequests(this.state.belongToWarehouseId);
          }
        }
      });
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreRequests) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';
    let loadingClass = (this.state.isInitTable || this.state.isInitTable == undefined) ? 'loading' : 'loading hidden';

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
                <RequestSearchForm ref="requestSearchForm" searchRequests={this.searchRequests} warehouses={this.state.warehouses}/>
              </div>
            </div>
            <hr/>
            {
              this.state.requests.map((item, idx) =>
                <AdminRequestItem key={`admin-request-row-${idx}`} item={item} postmen={this.state.postmen} warehouses={this.state.warehouses} handleAssign={this.handleAssign}/>
              )
            }
            <div className="clearfix"></div>
            <div className={loadingClass}>
              <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
            </div>              
            <div className="row">
              <div className="col-xs-12 m-b-30 text-center m-t-10">
                <button type="button" disabled={disabled} className="btn btn-default waves-effect w-md waves-light" onClick={this.loadMoreRequests}><i className={spinnerClass} aria-hidden="true"></i> {(this.state.hasMoreRequests) ? '显示更多' : '没有更多'}</button>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>
        <SweetAlert
          show={this.state.serverError != null}
          type="error"
          title="错误..."
          text={(this.state.serverError != null) ? this.state.serverError.message : ''}
          onConfirm={()=>this.setState({serverError: null})}
        />          

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />        
      </div>
    );
  }
}

RequestsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.CommonUserReducer.userDetails,
    warehouses: state.CommonUserReducer.warehouses,
    book: state.CommonUserReducer.book,
    requests: state.AdminUserReducer.requests,
    postmen: state.AdminUserReducer.postmen,
    serverError: state.AdminUserReducer.error,
    commonServerError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (req) => {
      dispatch(CommonUserActions.getUser(req.id, req.cb));
    },

    getBook: (req) => {
      dispatch(CommonUserActions.getBook(req.id, req.cb));
    },

    loadRequests: (req) => {
      if(req.data.belongToWarehouseId === "") {
        delete req.data.belongToWarehouseId;
      }
      dispatch(AdminUserActions.adminLoadRequests(req.data, req.cb));
    },

    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    },

    adminAllocateRequestToPostman: (req) => {
      dispatch(AdminUserActions.adminAllocateRequestToPostman(req.requestId, req.postmanId, req.cb));
    },

    adminLoadPostmen: (req) => {
      dispatch(AdminUserActions.adminLoadPostmen(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage);