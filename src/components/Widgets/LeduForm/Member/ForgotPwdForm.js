import React,{PropTypes} from 'react';

class ForgotPwdForm extends React.Component{
  render() {
    return (
      <form className="form-horizontal" action="#">
          <div className="form-group">
              <div className="col-xs-12">
                  <h5 className="m-t-0 header-title text-muted">输入您的注册邮箱，我们将把重设密码的链接发送到该邮箱。</h5>
              </div>
          </div>

          <div className="form-group ">
              <div className="col-xs-12">
                  <input className="form-control" type="email" required="" placeholder="您的电子邮件"/>
              </div>
          </div>

          <div className="form-group text-center m-t-30">
              <div className="col-xs-12">
                  <button className="btn btn-block btn-primary waves-effect waves-light" type="submit">找回密码</button>
              </div>
          </div>
      </form>
    );
  }
}

export default ForgotPwdForm;
