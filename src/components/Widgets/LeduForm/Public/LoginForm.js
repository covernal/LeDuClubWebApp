import React,{PropTypes} from 'react';
import {Link} from 'react-router';

class LoginForm extends React.Component{
  render() {
    return (      
      <form className="form-horizontal" action="#">
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
            <div className="checkbox checkbox-primary">
              <input id="checkbox-signup" type="checkbox" defaultChecked={true} />
              <label htmlFor="checkbox-signup">
                记住登录信息
              </label>
            </div>
          </div>
        </div>

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

export default LoginForm;
