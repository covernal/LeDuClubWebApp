import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SweetAlert from 'sweetalert-react';
import SignupForm from '../../components/Widgets/LeduForm/Member/SignupForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions} from '../../actions';
import swal from 'sweetalert';

class SignupPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false,
      warehouses: []
    };

    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    this.props.loadWarehouses({
      cb: () => {
        this.setState({
          serverError: this.props.serverError,
          sendingRequest: false
        });        

        if(this.props.serverError === null) {
          this.setState({
            warehouses: this.props.warehouses
          }, ()=> {
            this.refs.signupForm.setWarehouseId(this.props.warehouses[0].objectId);            
          });
        }
      }
    });
  }

  handleSignup(data) {
    this.setState({
      sendingRequest: true
    }, () => {      
      this.props.newMemberApplication({
        data: data,
        cb: () => {
          this.setState({
            serverError: this.props.serverError,
            sendingRequest: false
          });

          if(this.props.serverError === null) {
            let _this = this;
            swal({
              title: "正确", 
              text: "您已经成功加入等候名单，我们的会员专员会尽快与您联系。",
              type: "success"
            },
            function () {
              _this.context.router.push('/login');
            });            
          }
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
                    <SignupForm ref="signupForm" handleSignup={this.handleSignup} warehouses={this.state.warehouses}/>
                    <div className="clearfix"></div>
                  </div>
                </div>

                <div className="row m-t-50">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">已经是爱贝读会员?<Link to="/login" className="text-primary m-l-5"><b>登录</b></Link></p>
                  </div>
                </div>
              </div>
            </div>
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
      </section>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    warehouses: state.CommonUserReducer.warehouses,
    serverError: state.CommonUserReducer.error,
    user: state.CommonUserReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWarehouses: (req) => {
      dispatch(CommonUserActions.loadWarehouses(req.cb));
    },
    newMemberApplication: (req) => {
      dispatch(CommonUserActions.newMemberApplication(req.data, req.cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);