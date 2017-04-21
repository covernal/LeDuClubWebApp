import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import moment from 'moment';
import SweetAlert from 'sweetalert-react';
import ImageUploader from 'react-image-uploader';
import Header from '../../components/Layouts/Common/Header';
import SubHeader from '../../components/Layouts/Common/SubHeader';
import Footer from '../../components/Layouts/Common/Footer';
import MyProfileForm from '../../components/Widgets/LeduForm/Member/MyProfileForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions} from '../../actions';

class MyProfilePage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      serverError: null,
      userDetails: null,
      loadingRequest: true,
      sendingRequest: false
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.rednerImageUploader = this.rednerImageUploader.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    let books = [];
    this.props.getUser({
      id: cookie.load('id'),
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
    let profileImageURL = '';
    if(this.state.userDetails !== null) {
      if(this.state.userDetails.profileImageURL !== undefined) {
        data.profileImageURL = this.state.userDetails.profileImageURL;
        profileImageURL = data.profileImageURL;
      }
    }
    
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
            if(profileImageURL !== '') {
              cookie.save('profileImageURL', profileImageURL, {
                path: '/',
                maxAge: 60*60*24*365
              }); 
              this.forceUpdate();
            }
          }
        }
      });
    });
  }

  uploadImage(file, done, progress) {
    let AV = global.AV;
    let error = null;    
    let _this = this;
    _this.setState({
      sendingRequest: true
    }, () => {
      let profileImageFile = new AV.File('profile_image.png', file);
      profileImageFile.save().then((res) => {
        _this.setState({
          sendingRequest: false,
          serverError: this.props.serverError          
        });

        let userDetails = _this.state.userDetails;
        userDetails.profileImageURL = res.attributes.url;
        this.setState({
          userDetails: userDetails
        });
      }, (error) => {
        _this.setState({
          sendingRequest: false,
          serverError: error
        });
      });      
    });
  }

  rednerImageUploader(props) {
    if (props.image) {
      return null;
    }

    let image = "/assets/images/defaultAvatar.jpg";
    if(this.state.userDetails !== null) {
      if(this.state.userDetails.profileImageURL !== undefined && this.state.userDetails.profileImageURL !== "") {
        image = this.state.userDetails.profileImageURL;
      }
    } 

    return (
      <div className="thumb-xl member-thumb m-b-10 center-block">
        <img src={image} className="img-circle img-thumbnail" alt="profile-image" onClick={props.onUploadPrompt} />
      </div>      
    );
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
                  <h4 className="page-title">账户管理</h4>
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
                              <ImageUploader onUpload={this.uploadImage} onRender={this.rednerImageUploader} image={image} />
                              <h4 className="m-b-5">{user.fullName}</h4>
                              <p className="text-muted font-13 m-t-20">
                                用户名： <b>{user.username}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                会员加入日： <b>{moment.utc(user.membershipStartDate).add(8, 'hours').format('YYYY-MM-DD')}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                会员有效期至： <b>{moment.utc(user.membershipExpireOn).add(8, 'hours').format('YYYY-MM-DD')}</b>
                              </p>
                              <p className="text-muted font-13 m-t-20">
                                押金已付： <b>¥{user.deposit}</b>
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
                              <MyProfileForm userData={user} handleSave={this.handleSave} />
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

MyProfilePage.contextTypes = {
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
      dispatch(CommonUserActions.memberUpdateProfile(req.data, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);