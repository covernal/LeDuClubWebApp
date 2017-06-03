import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import cookie from 'react-cookie';
import LoginForm from '../../components/Widgets/LeduForm/Public/LoginForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import swal from 'sweetalert';

import {CommonUserActions} from '../../actions';
class LoginPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if(this.state.session){
      const req = {
        data: {
          session: this.state.session
        }
      };
      //this.login(req);
      if(cookie.load('type') === 'postman') {
        this.context.router.push('/postman/my-requests');
      }else {
        this.context.router.push('/thisweek');
      }
    }
  }  

  login(data) {
    this.setState({
      sendingRequest: true
    }, () => {
      //Submit the form data req.data
      this.props.login(data, () => {
        if(this.props.serverError != undefined){
          this.setState({
            serverError: {
              message: (this.props.serverError.code === 219) ? this.props.serverError.message : '找不到用户'
            },
            sendingRequest: false,
            session: this.state.session
          });
        }else{
          if(this.props.userDetails.attributes.membershipStatus == "membershipstatus") {
            //if mentor is still un-approved
            this.setState({
              serverError: {
                message: '您的申请尚未获得批准.'
              },
              sendingRequest: false,
              session: this.state.session
            });
            return;
          }           

          if(this.props.userDetails.attributes.deposit === 0) {
            swal({
              title: "错误...",
              text: "您的会员申请仍在等候名单中，我们的会员专员会稍后与您联系。",
              type: "error"
            });    

            this.setState({
              serverError: null,
              sendingRequest: false
            });      
            return;
          }          

          if(!this.state.session){
            const maxAge = data.rememberMe?60*60*24*365:60*60;
            const session = this.props.userDetails.getSessionToken();

            cookie.save('session', session, {
              path: '/',
              maxAge: maxAge
            });

            cookie.save('username', this.props.userDetails.attributes.username, {
              path: '/',
              maxAge: maxAge
            });
            
            cookie.save('id', this.props.userDetails.id, {
              path: '/',
              maxAge: maxAge
            });              

            cookie.save('type', this.props.userDetails.attributes.type, {
              path: '/',
              maxAge: maxAge
            });

            cookie.save('belongToWarehouseId', this.props.userDetails.attributes.belongToWarehouseId, {
              path: '/',
              maxAge: maxAge
            });            

            cookie.save('profileImageURL', this.props.userDetails.attributes.profileImageURL, {
              path: '/',
              maxAge: maxAge
            });              
          }

          this.setState({
            serverError: this.props.serverError,
            sendingRequest: false,
            session: this.state.session
          }, () => {
            let type = this.props.userDetails.attributes.type;
            let homeURL = '/thisweek';
            if(type == 'admin') {
              homeURL = '/admin/members';                
            }else if(type == 'member') {
              homeURL = '/thisweek';  
            }else if(type == 'postman') {
              homeURL = '/postman/my-requests';  
            }
            window.location = homeURL;
          });
        }
        
      });
    });
  }

  render() {
    let overlayClass = (this.state.sendingRequest) ? 'ledu-overlay show' : 'ledu-overlay';

    return (
      <section>
        <div className="container-alt">
          <div className="row">
            <div className="col-sm-12">
              <div className="wrapper-page">
                <div className="m-t-40 account-pages">
                  <div className="text-center account-logo-box">
                    <h2 className="text-uppercase">
                      <a href="/" className="text-success">
                        <span><img src="assets/images/logo.png" alt="" height="36"/></span>
                      </a>
                    </h2>
                  </div>
                  <div className="account-content">
                    <LoginForm login={this.login} serverError={this.state.serverError}/>
                    <div className="clearfix"></div>
                  </div>
                </div>
                <div className="row m-t-50">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">还没有加入爱贝读? <Link to="/signup" className="text-primary m-l-5"><b>注册会员</b></Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LeduOverlay
          overlayClass={overlayClass}
          message="现在登录您的帐户，请稍候..."
        />        
      </section>
    );
  }
}

LoginPage.contextTypes = {
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
    login: (data, cb) => {
      dispatch(CommonUserActions.login(data, cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
