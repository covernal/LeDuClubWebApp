import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import SweetAlert from 'sweetalert-react';
import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import ProfileForm from '../../components/Widgets/LeduForm/Admin/ProfileForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions, AdminUserActions} from '../../actions';

class ProfilePage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      serverError: null,
      userDetails: null,
      loadingRequest: true,
      sendingRequest: false
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    let books = [];
    this.props.getUser({
      id: this.props.params.id,
      cb: () => {
        this.setState({
          serverError: this.props.serverError,
          userDetails: this.props.userDetails,
          loadingRequest: (this.props.serverError === null) ? false : true
        });
      }
    });
  }

  handleSave(data) {
    this.setState({
      sendingRequest: true
    }, () => {
      this.props.updateUserProfile({
        data: data,
        cb: () => {
          this.setState({
            serverError: this.props.serverError,
            sendingRequest: false
          });

          if(this.props.serverError === null) {
            this.state.userDetails.fullName = data.fullName;
            this.setState({
              userDetails: this.state.userDetails
            });

            this.context.router.push('/admin/members');
          }
        }
      });
    });
  }

  render() {
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';
    let user = this.state.userDetails;
    let image = "/assets/images/defaultAvatar.jpg";
    if(user && user.profileImageURL !== undefined && user.profileImageURL !== "") {
      image = user.profileImageURL;
    }

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
                  <h4 className="page-title">会员帐户管理（{(this.state.loadingRequest == true) ? '姓名' : user.fullName}）</h4>
                </div>
              </div>
            </div>            
            <div className="row">
              <div className="col-sm-12">
                {
                  (this.state.loadingRequest == true) ?
                  (
                    <div className="loading">
                      <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"></i>
                    </div>               
                  ) : 
                  (
                    <div className="card-box">
                      <div className="row">
                        <div className="col-lg-3 col-md-4">
                          <div className="text-center card-box">
                            <div className="member-card">
                              <div className="thumb-xl member-thumb m-b-10 center-block">
                                <img src={image} className="img-circle img-thumbnail" alt="profile-image" />
                              </div>                               
                              <h4 className="m-b-5">{user.fullName}</h4>
                              <p className="text-muted font-13 m-t-20">
                                用户名：<b>{user.username}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                会员加入日：<b>{moment.utc(user.membershipStartDate).add(8, 'hours').format('YYYY-MM-DD')}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                会员有效期至：<b>{moment.utc(user.membershipExpireOn).add(8, 'hours').format('YYYY-MM-DD')}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                押金已付：<b>¥{user.deposit}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                送取日: <b>{user.deliveryDay}</b>
                              </p>                              
                            </div>
                          </div>
                        </div>

                        <div className="col-md-8 col-lg-9">
                          <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <ProfileForm userData={user} handleSave={this.handleSave} />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />               

        <SweetAlert
          show={this.state.serverError != null}
          type="error"
          title="错误..."
          text={(this.state.serverError != null) ? this.state.serverError.message : ''}
          onConfirm={()=>this.setState({serverError: null})}
        />                      
      </div>
    );
  }
}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.CommonUserReducer.userDetails,
    serverError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (req) => {
      dispatch(CommonUserActions.getUser(req.id, req.cb));
    },

    updateUserProfile: (req) => {
      dispatch(AdminUserActions.adminUpdateMemberProfile(req.data, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);