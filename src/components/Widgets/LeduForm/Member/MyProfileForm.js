import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';
import AgesRangeSelector from '../../LeduInput/AgesRangeSelector';

window.Parsley.setLocale('zh-cn');

class MyProfileForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      data: {
        childrenAgeGroup: this.props.userData.childrenAgeGroup,
        fullName: this.props.userData.fullName,
        email: this.props.userData.email,
        deliveryAddressString: this.props.userData.deliveryAddressString,
        lat: this.props.userData.deliveryAddressGeoPoint._latitude,
        lon: this.props.userData.deliveryAddressGeoPoint._longitude,
        mobilePhoneNumber: this.props.userData.mobilePhoneNumber
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
            <AgesRangeSelector value={this.state.data.childrenAgeGroup} placeholder="孩子所属年龄组" required disabled={true} handleChange={this.handleChange.bind(this, 'childrenAgeGroup')}/>
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
            <input className="form-control" type="text" placeholder="书籍取送地址" required value={this.state.data.deliveryAddressString} onChange={this.handleChange.bind(this, 'deliveryAddressString')} disabled="disabled"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="手机号码（取送时必要联系方式）" required value={this.state.data.mobilePhoneNumber} onChange={this.handleChange.bind(this, 'mobilePhoneNumber')}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-4">
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">保存修改</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-muted font-13">
              * 请联系客服修改孩子所属年龄组和书籍送去地址。
            </div>
          </div>
        </div>        
      </form>
    );
  }
}

export default MyProfileForm;
