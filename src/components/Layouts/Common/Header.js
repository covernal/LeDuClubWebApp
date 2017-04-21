import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Utils from '../../../utils';
import '../../../assets/templates/js/waves.js';
import cookie from 'react-cookie';

require("./_common.less");
require("../../../assets/templates/images/defaultAvatar.jpg");
require("../../../assets/templates/images/favicon.ico");
const logo = require("../../../assets/templates/images/logo.png");

let AV = global.AV;
class Header extends Component {
  constructor(props, context) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AV.User.logOut()
      .then(response => {
        Utils.AuthHelper.logout();
        this.context.router.push('/login'); 
      });
  }  

  render() {
    if (!this.props) {
      return null;
    }
    
    let profileImageURL = cookie.load('profileImageURL');
    let image = (profileImageURL != undefined && profileImageURL != "undefined") ? profileImageURL : "/assets/images/defaultAvatar.jpg";
    let actionBar = (!this.props.isPublic || (cookie.load('username') != undefined)) ?
    <div className="menu-extras">
      {
        (cookie.load('type') !== undefined) ?
        (
          <ul className="nav navbar-nav navbar-right pull-right">
            <li className="dropdown navbar-c-items">
              <a href="" className="dropdown-toggle waves-effect waves-light profile" data-toggle="dropdown" aria-expanded="true">
                <img src={image} alt="user-img" className="img-circle" /> 
              </a>
              <ul className="dropdown-menu dropdown-menu-right arrow-dropdown-menu arrow-menu-right user-list notify-list">
                <li><a onClick={this.logout}><i className="fa fa-power-off m-r-5"></i> 登出</a></li>
              </ul>
            </li>
          </ul>
        ) : ''
      }
      <div className="menu-item">
        <a className="navbar-toggle">
          <div className="lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </div> : <div></div>;

    return (
      <div className="topbar-main">
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo">
              <img src={logo} height="30" />
            </Link>
          </div>

          {actionBar}
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

Header.propTypes = {
  isPublic: PropTypes.bool.isRequired
};

export default Header;
