import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';
import AgesRangeSelector from '../../LeduInput/AgesRangeSelector';
import LeduOverlay from '../../LeduOverlay';
import swal from 'sweetalert';

// require('react-bootstrap-select');

window.Parsley.setLocale('zh-cn');
let geocoder = new window.AMap.Geocoder({
  city: "全国"
});

class ProfileForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      getLocationRequest: false,
      data: {
        memberId: this.props.userData.objectId,
        deliveryDay: (this.props.userData.deliveryDay) ? this.props.userData.deliveryDay : '周一',
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

  componentDidMount() {

  }  

  handleSubmit(e) {
    let _this = this;
    e.preventDefault();
    let validation = $('#profile-form').parsley().validate();
    if(validation != true) {
      return;
    }
  
    this.setState({
      getLocationRequest: true
    });

    let state = this.state;
    geocoder.getLocation(this.state.data.deliveryAddressString, function(status, result) {
      if (status === 'complete' && result.info === 'OK') {
        state.data.lat = "" + result.geocodes[0].location.lat;
        state.data.lon = "" + result.geocodes[0].location.lng;          
      }else {
        state.data.lat = "";
        state.data.lon = "";
      }
      
      state.getLocationRequest = false;
      _this.setState(state);        
      if(state.data.lat === "" || state.data.lon === "") {
        swal({
          title: "错误...",
          text: "请输入正确的地址。",
          type: "error"
        });
        return;
      }

      _this.props.handleSave(_this.state.data);      
    });
  }

  handleChange(type, e) {    
    let state = this.state;
    state.data[type] = e.target.value;
    this.setState(state);
  }

  render() {
    let overlayClass = (this.state.getLocationRequest) ? 'ledu-overlay show' : 'ledu-overlay';
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate noValidate id="profile-form">
        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" required value={this.state.data.deliveryDay} onChange={this.handleChange.bind(this, 'deliveryDay')}>
              <option value="" disabled>送取日</option>
              <option value="周一">周一</option>
              <option value="周二">周二</option>
              <option value="周三">周三</option>
              <option value="周四">周四</option>
              <option value="周五">周五</option>
              <option value="周六">周六</option>
              <option value="周日">周日</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <AgesRangeSelector value={this.state.data.childrenAgeGroup} placeholder="孩子所属年龄组" required handleChange={this.handleChange.bind(this, 'childrenAgeGroup')}/>
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
            <input className="form-control" type="text" placeholder="书籍取送地址" required value={this.state.data.deliveryAddressString} onChange={this.handleChange.bind(this, 'deliveryAddressString')}/>
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

        <LeduOverlay
          overlayClass={overlayClass}
          message="请稍候..."
        />            
      </form>
    );
  }
}

export default ProfileForm;
