import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';

window.Parsley.setLocale('zh-cn');

class ForgotPwdForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let validation = $('#forgotpwd-form').parsley().validate();
    if(validation != true) {
      return;
    }    

    this.props.handleSubmit(this.state);
  }

  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }  
  render() {
    return (  
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate noValidate id="forgotpwd-form">
          <div className="form-group">
              <div className="col-xs-12">
                  <h5 className="m-t-0 header-title text-muted">输入您的注册邮箱，我们将把重设密码的链接发送到该邮箱。</h5>
              </div>
          </div>

          <div className="form-group ">
              <div className="col-xs-12">
                  <input className="form-control" type="email" required placeholder="您的电子邮件" data-parsley-type="email" value={this.state.email} onChange={this.handleChange}/>
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
