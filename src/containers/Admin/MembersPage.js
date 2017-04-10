import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import Find from 'lodash/find';
import SweetAlert from 'sweetalert-react';

import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MembersList from '../../components/Layouts/Admin/MembersList';
import MemberSearchForm from '../../components/Widgets/LeduForm/Admin/MemberSearchForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions, AdminUserActions} from '../../actions';

class MembersPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: true,      
      skip: 0,
      hasMoreMembers: true,
      isLoadingMore: false,
      isInitTable: true,
      members: [],
      warehouses: [],
      belongToWarehouseId: '',
      membershipStatus: ''
    };

    this.searchMembers = this.searchMembers.bind(this);
    this.loadMoreMembers = this.loadMoreMembers.bind(this);
    this._loadMembers = this._loadMembers.bind(this);
  }

  searchMembers(opt) {
    this.setState({
      skip: 0,
      members: [],
      isInitTable: true,
      isLoadingMore: false,
      hasMoreMembers: true,
      belongToWarehouseId: opt.belongToWarehouseId,
      membershipStatus: opt.membershipStatus
    }, () => {
      this._loadMembers();
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

    this._loadMembers();
  }

  loadMoreMembers() {
    this.setState({
      isLoadingMore: true
    }, () => {
      this._loadMembers();
    });
  }

  _loadMembers() {
    this.props.loadMembers({
      data: {
        skip: this.state.skip,
        belongToWarehouseId: this.state.belongToWarehouseId,
        membershipStatus: this.state.membershipStatus
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

    if(this.props.members.length > 0){
      let limit = 0;
      this.props.members.forEach((member) => {
        let existObj = Find(this.state.members, (l) => {
          return l.id == member.id;
        });
        if(existObj == undefined) {
          this.state.members.push(member);
          limit++;
        }
      });

      this.setState({
        skip: this.state.skip + limit,
        members: this.state.members,
        isInitTable: false,
        isLoadingMore: false
      });
    }else{
      this.setState({
        hasMoreMembers: false,
        isInitTable: false,
        isLoadingMore: false
      });
    }
  }

  render() {
    if (!this.props) {
      return null;
    }

    let disabled = (this.state.isLoadingMore || !this.state.hasMoreMembers) ? 'disabled' : '';
    let spinnerClass = (this.state.isLoadingMore) ? 'fa fa-spinner fa-spin-custom' : 'fa fa-spinner fa-spin-custom hidden';

    let overlayClass = 'ledu-overlay';
    // let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

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
                  <h4 className="page-title">会员管理</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <MemberSearchForm warehouses={this.state.warehouses} searchMembers={this.searchMembers}  />
              </div>
            </div>            
            <MembersList isInitTable={this.state.isInitTable} members={this.state.members}/>

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

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    warehouses: state.CommonUserReducer.warehouses,
    members: state.AdminUserReducer.members,
    serverError: state.AdminUserReducer.error,
    commonServerError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMembers: (req) => {
      if(req.data.belongToWarehouseId === "") {
        delete req.data.belongToWarehouseId;
      }
      if(req.data.membershipStatus === "") {
        delete req.data.membershipStatus;
      }
      dispatch(AdminUserActions.adminLoadMembers(req.data, req.cb));
    },

    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);