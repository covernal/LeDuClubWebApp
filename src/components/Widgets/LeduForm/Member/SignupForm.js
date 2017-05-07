import React,{PropTypes} from 'react';
import parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/zh_cn';
import $ from 'jquery';
import AgesRangeSelector from '../../LeduInput/AgesRangeSelector';
import ServerConfig from '../../../../../cfg/NodeJS';
import LeduOverlay from '../../LeduOverlay';
import swal from 'sweetalert';

const AV = global.AV;

let geocoder = new window.AMap.Geocoder({
  city: "全国"
});

window.Parsley.setLocale('zh-cn');

class SignupForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      data: {
        belongToWarehouseId: '',
        childrenAgeGroup: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        mobilePhoneNumber: '',
        profileImageURL: '',
        deliveryAddressString: '',        
        lat: '',
        lon: ''
      },
      agree: false
    };

    this.setWarehouseId = this.setWarehouseId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let validation = $('#signup-form').parsley().validate();
    if(validation != true) {
      return;
    }    

    let _this = this;

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
    
      _this.props.handleSignup(_this.state.data);    
    });    
  }

  setWarehouseId(id) {
    let state = this.state;
    state.data.belongToWarehouseId = id;
    this.setState(state);
  }

  handleChange(type, e) {
    let _this = this;
    let state = this.state;
    let value = e.target.value;

    if(type === "agree") {
      state[type] = value;
    }else {
      state.data[type] = value;
    }    
    this.setState(state);
  }

  render() {
    let overlayClass = (this.state.getLocationRequest) ? 'ledu-overlay show' : 'ledu-overlay';
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} data-parsley-validate noValidate id="signup-form">
      <div className="form-group">
        <div className="col-xs-12">
          <h4 className="m-t-0 header-title text-muted"><b>注册会员免费试用2周</b></h4>
        </div>
      </div>      
        <div className="form-group">
          <div className="col-xs-12">
            <h4 className="m-t-0 header-title text-warning">因为收到大量申请，为了确保现有会员体验，我们需要您先加入等候名单。请确保资料真实，我们的专员会稍后与您联系。</h4>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" required value={this.state.data.belongToWarehouseId} onChange={this.handleChange.bind(this, 'belongToWarehouseId')}>
              <option value="" disabled>所在城市</option>
              {
                this.props.warehouses.map((item, idx) =>
                  <option key={`warehouse-${idx}`} value={item.objectId}>{item.addressString}</option>
                )
              }
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <AgesRangeSelector value={this.state.data.childrenAgeGroup} required placeholder="孩子所属年龄组" handleChange={this.handleChange.bind(this, 'childrenAgeGroup')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="您的姓名" required value={this.state.data.fullName} onChange={this.handleChange.bind(this, 'fullName')}/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="email" placeholder="电子邮件（主要联系方式）" required value={this.state.data.email} onChange={this.handleChange.bind(this, 'email')} data-parsley-type="email" />
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" placeholder="用户名" required value={this.state.data.username} onChange={this.handleChange.bind(this, 'username')}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <input className="form-control" type="password" placeholder="密码" required value={this.state.data.password} onChange={this.handleChange.bind(this, 'password')}/>
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
          <div className="col-xs-12">
            <div className="checkbox checkbox-success">
              <input id="checkbox-signup" type="checkbox" required value={this.state.data.agree} onChange={this.handleChange.bind(this, 'agree')} />
              <label htmlFor="checkbox-signup">我接受<a href="/terms">《乐读用户服务协议》</a></label>
            </div>
          </div>
        </div>

        <div className="form-group text-center m-t-30">
          <div className="col-xs-12">
            <button className="btn btn-block btn-primary waves-effect waves-light" type="submit">加入等候名单</button>
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

export default SignupForm;
