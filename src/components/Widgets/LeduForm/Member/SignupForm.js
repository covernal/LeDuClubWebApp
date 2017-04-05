import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import $ from 'jquery';

class SignupForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      data: {
        city: '',
        agesRange: '',
        fullName: '',
        email: '',
        userName: '',
        password: '',
        address: '',
        phone: ''
      },
      agree: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let validation = $('#signup-form').parsley().validate();
    if(validation != true) {
      return;
    }    

    this.props.handleSignup(this.state.data);
  }

  handleChange(type, e) {
    let state = this.state;
    state.data[type] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate noValidate id="signup-form">
        <div className="form-group">
          <div className="col-xs-12">
            <h4 className="m-t-0 header-title text-warning">因为收到大量申请，为了确保现有会员体验，我们需要您先加入等候名单。请确保资料真实，我们的专员会稍后与您联系。</h4>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" required value={this.state.data.city} onChange={this.handleChange.bind(this, 'city')}>
              <option value="" disabled>所在城市</option>
              <option value="1">仓库一</option>
              <option value="2">仓库二</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" required value={this.state.data.agesRange} onChange={this.handleChange.bind(this, 'agesRange')}>
              <option value="" disabled>孩子所属年龄组</option>
              <option value="1">3-5岁</option>
              <option value="2">6-8岁</option>
              <option value="3">9-12岁</option>
            </select>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="您的姓名" required value={this.state.data.fullName} onChange={this.handleChange.bind(this, 'fullName')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="email" placeholder="电子邮件（主要联系方式）" required value={this.state.data.email} onChange={this.handleChange.bind(this, 'email')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="用户名" required value={this.state.data.userName} onChange={this.handleChange.bind(this, 'userName')}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <input className="form-control" type="password" placeholder="密码" required value={this.state.data.password} onChange={this.handleChange.bind(this, 'password')}/>
          </div>
        </div>


        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="书籍取送地址" required value={this.state.data.address} onChange={this.handleChange.bind(this, 'address')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="手机号码（可选）" value={this.state.data.phone} onChange={this.handleChange.bind(this, 'phone')}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <div className="checkbox checkbox-success">
              <input id="checkbox-signup" type="checkbox" required value={this.state.data.agree} onChange={this.handleChange.bind(this, 'agree')} data-parsley-error-message="Please tick the agreement checkbox."/>
              <label htmlFor="checkbox-signup">我接受<a href="https://www.leduclub.com/agreement.html">《乐读用户服务协议》</a></label>
            </div>
          </div>
        </div>

        <div className="form-group text-center m-t-30">
          <div className="col-xs-12">
            <button className="btn btn-block btn-primary waves-effect waves-light" type="submit">加入等候名单</button>
          </div>
        </div>
      </form>
    );
  }
}

export default SignupForm;
