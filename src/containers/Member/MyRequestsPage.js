import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';
import moment from 'moment';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MemberRequestItem from '../../components/Widgets/LeduCard/MemberRequestItem';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions, MemberUserActions} from '../../actions';

class MyRequestsPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,      
      isInitTable: true,
      requests: []
    };
  }

  componentDidMount() {
    let requests = [];    
    let limit = 0;  
    this.props.loadRequests({
      cb: () => {
        console.log(this.props.requests);
        this.setState({
          serverError: this.props.serverError
        });          

        if(this.props.serverError === null) {
          if(this.props.requests.length > 0) {
            this.props.requests.forEach((request, idx) => {
              this.props.getBook({
                id: request.bookId,
                cb: () => {
                  request['book'] = this.props.book;
                  requests.push(request);
                  limit++;
                  if(this.props.requests.length === limit) {
                    this.setState({
                      requests: requests,
                      isInitTable: false
                    });
                  }
                }
              });
            });
          }else {
            this.setState({
              requests: [],
              isInitTable: false
            });
          }
        }
      }
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

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
                  <h4 className="page-title">我的请求</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10">
                {
                  this.state.requests.map((item, idx) =>
                    <MemberRequestItem key={`request-${idx}`} item={item} />
                  )
                }
              </div>
            </div>
            
            <div className="clearfix"></div>
            <div className={loadingClass}>
              <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
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

MyRequestsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    book: state.CommonUserReducer.book,
    requests: state.MemberUserReducer.requests,
    serverError: state.MemberUserReducer.error,
    commonServerError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBook: (req) => {
      dispatch(CommonUserActions.getBook(req.id, req.cb));
    },

    loadRequests: (req) => {     
      dispatch(MemberUserActions.memberGetMyBookRequests(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);
