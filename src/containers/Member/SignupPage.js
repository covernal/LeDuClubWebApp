import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import SignupForm from '../../components/Widgets/LeduForm/Member/SignupForm';
import LeduOverlay from '../../components/Widgets/LeduOverlay';

class SignupPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(data) {
    console.log(data);
    this.setState({
      sendingRequest: true
    }, () => {
      // call API
      this.setState({
        sendingRequest: false
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
                    <SignupForm handleSignup={this.handleSignup}/>
                    <div className="clearfix"></div>
                  </div>
                </div>

                <div className="row m-t-50">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">已经是乐读会员?<Link to="/login" className="text-primary m-l-5"><b>登录</b></Link></p>
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

export default SignupPage;
