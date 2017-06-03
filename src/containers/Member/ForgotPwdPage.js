import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ForgotPwdForm from '../../components/Widgets/LeduForm/Member/ForgotPwdForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';
import {CommonUserActions} from '../../actions';

class ForgotPwdPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.setState({
      sendingRequest: true
    }, () => {
      //Submit the form data req.data
      this.props.resetPassword(data.email, () => {
        if(this.props.serverError != null){
          this.setState({
            serverError: this.props.serverError.message,
            sendingRequest: false
          });
        }else{
          this.setState({
            serverError: null,
            sendingRequest: false
          });

          this.context.router.push('/login');
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
                            <a href="index.html" className="text-success">
                                <span><img src="assets/images/logo.png" alt="" height="36"/></span>
                            </a>
                        </h2>
                    </div>
                    <div className="account-content">
                        <ForgotPwdForm handleSubmit={this.handleSubmit} />
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

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />           
      </section>
    );
  }
}

ForgotPwdPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    resetPasswordEmailStatus: state.CommonUserReducer.resetPasswordEmailStatus,
    serverError: state.CommonUserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (data, cb) => {
      dispatch(CommonUserActions.resetPassword(data, cb));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdPage);
