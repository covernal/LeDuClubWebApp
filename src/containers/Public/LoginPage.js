import React,{PropTypes} from 'react';
import LoginForm from '../../components/Widgets/LeduForm/Public/LoginForm';

class LoginPage extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      sendingRequest: false
    };
  }

  render() {
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
                    <LoginForm />
                    <div className="clearfix"></div>
                  </div>
                </div>
                <div className="row m-t-50">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">还没有加入乐读? <a href="page-register.html" className="text-primary m-l-5"><b>注册会员</b></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
