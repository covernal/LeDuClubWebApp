import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';

window.Parsley.setLocale('zh-cn');

class MyProfileForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      data: {
        agesRange: '',
        fullName: '',
        email: '',
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
    let validation = $('#profile-form').parsley().validate();
    if(validation != true) {
      return;
    }    

    this.props.handleSave(this.state.data);
  }

  handleChange(type, e) {
    let state = this.state;
    state.data[type] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate noValidate id="profile-form">
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
            <input className="form-control" type="text" placeholder="电子邮件（主要联系方式）" data-parsley-type="email" required value={this.state.data.email} onChange={this.handleChange.bind(this, 'email')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="书籍取送地址" required value={this.state.data.address} onChange={this.handleChange.bind(this, 'address')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="手机号码（可选）" required value={this.state.data.phone} onChange={this.handleChange.bind(this, 'phone')}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-4">
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">保存修改</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default MyProfileForm;
