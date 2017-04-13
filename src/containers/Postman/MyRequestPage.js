import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import TaskSearchForm from '../../components/Widgets/LeduForm/Postman/TaskSearchForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import PostmanTaskRow from '../../components/Widgets/LeduCard/PostmanTaskRow';
import {PostmanActions, CommonUserActions} from '../../actions';

class MyRequestPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,      
      skip: 0,
      hasMoreRequests: true,
      isLoadingMore: false,
      isInitTable: true,
      requests: [],
      requestType: 'borrow',
      serverError: null
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.searchRequests = this.searchRequests.bind(this);
    this.loadMoreRequests = this.loadMoreRequests.bind(this);
    this._loadRequests = this._loadRequests.bind(this);
  }

  searchRequests(requestType) {
    this.setState({
      skip: 0,
      requests: [],
      isInitTable: true,
      isLoadingMore: false,
      hasMoreRequests: true,
      requestType: requestType
    }, () => {
      this._loadRequests();
    });
  }

  componentDidMount() {
    this.refs.requestSearchForm.setState({
      requestType: "borrow"
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
        requestType: this.state.requestType
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

  handleConfirm(requestId) {
    console.log(requestId);
    this.setState({
      sendingRequest: true
    }, ()=> {
      this.props.postmanConfirmBookRequestCompleted({
        requestId: requestId,
        cb: () => {
          this.setState({
            sendingRequest: false,
            serverError: this.props.serverError
          });
          if(this.props.serverError === null) {
            this.searchRequests(this.state.requestType);
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
                  <h4 className="page-title">我的配送任务</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <TaskSearchForm ref="requestSearchForm" searchRequests={this.searchRequests}/>
              </div>
            </div>
            <hr/>

            <div className="row">
              <div className="col-md-10">
              {
                this.state.requests.map((request, idx) =>
                  <PostmanTaskRow key={`request-${idx}`} item={request} handleConfirm={this.handleConfirm}/>
                )
              }
              </div>
            </div>
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

MyRequestPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.CommonUserReducer.userDetails,
    book: state.CommonUserReducer.book,    
    requests: state.PostmanReducer.requests,
    request: state.PostmanReducer.request,
    serverError: state.PostmanReducer.error,
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
      dispatch(PostmanActions.postmanGetMyRequests(req.data.skip, req.data.requestType, req.cb));
    },

    postmanConfirmBookRequestCompleted: (req) => {
      dispatch(PostmanActions.postmanConfirmBookRequestCompleted(req.requestId, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestPage);
