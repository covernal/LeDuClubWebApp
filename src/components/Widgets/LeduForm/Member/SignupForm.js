import React,{PropTypes} from 'react';

class SignupForm extends React.Component{
  render() {
    return (
      <form className="form-horizontal" action="#">
        <div className="form-group">
          <div className="col-xs-12">
            <h4 className="m-t-0 header-title text-warning">因为收到大量申请，为了确保现有会员体验，我们需要您先加入等候名单。请确保资料真实，我们的专员会稍后与您联系。</h4>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>所在城市</option>
              <option value="1">仓库一</option>
              <option value="1">仓库二</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>孩子所属年龄组</option>
              <option value="1">3-5岁</option>
              <option value="1">6-8岁</option>
              <option value="2">9-12岁</option>
            </select>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="您的姓名"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="email" required="" placeholder="电子邮件（主要联系方式）"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="用户名"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <input className="form-control" type="password" required="" placeholder="密码"/>
          </div>
        </div>


        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="书籍取送地址"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="手机号码（可选）"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <div className="checkbox checkbox-success">
              <input id="checkbox-signup" type="checkbox" checked="checked"/>
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
