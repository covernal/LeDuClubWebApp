import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';

window.Parsley.setLocale('zh-cn');

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $('form').parsley();
  }

  handleChange(type, e){
    if(type != 'rememberMe'){
      this.setState({
        [type]: e.target.value
      });
    }else{
      this.setState({
        [type]: e.target.checked
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();    
    let validation = $('#login-form').parsley().validate();
    if(validation != true) {
      return;
    }

    this.props.login(this.state);
  }

  render() {
    let serverErrorBlock = (this.props.serverError != undefined) ?
      <h6 className="server-error">{this.props.serverError.message}</h6> : <div></div>;

    return (      
      <form className="form-horizontal" id="login-form" data-parsley-validate noValidate onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <div className="col-xs-12">
            <h4 className="m-t-0 header-title text-muted"><b>会员登录</b></h4>
          </div>
        </div>
      
        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required placeholder="用户名" value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <input className="form-control" type="password" required placeholder="密码" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <div className="checkbox checkbox-primary">
              <input id="checkbox-signup" type="checkbox" onChange={this.handleChange.bind(this, 'rememberMe')} />
              <label htmlFor="checkbox-signup">
                记住登录信息
              </label>
            </div>
          </div>
        </div>

        {serverErrorBlock}

        <div className="form-group text-center m-t-30">
          <div className="col-xs-12">
            <button className="btn btn-block btn-primary waves-effect waves-light" type="submit">登录</button>
          </div>
        </div>

        <div className="form-group text-center m-t-0">
          <div className="col-sm-12">
            <Link to="/forgot-pwd" className="text-muted"><i className="fa fa-lock m-r-5"></i> 忘记密码?</Link>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;
