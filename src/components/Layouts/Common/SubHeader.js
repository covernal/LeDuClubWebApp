import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import MenuConstants from '../../../constants/MenuConstants';
import Cookie from 'react-cookie';

class SubHeader extends Component {
  checkExternalLink(url) {
    let pattern = /^((http|https|ftp):\/\/)/;
    return pattern.test(url);
  }

  render() {
    if(!this.props) {
      return null;
    }

    let rows = [];
    let type = (this.props.type) ? this.props.type : Cookie.load('type');
    let menuList = (this.props.menuList == undefined) ? MenuConstants[type] : this.props.menuList;
    
    menuList.forEach((item, index) => {
      if(item.icon == ''){
        if(!this.checkExternalLink(item.url)){
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link to={item.url}>{item.name}</Link>
            </li>            
          );
        }else{
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link href={item.url} target="_blank">{item.name}</Link>
            </li>
          );
        }
      }else{
        if(!this.checkExternalLink(item.url)){
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link to={item.url}><i className={item.icon}></i>{item.name}</Link>
            </li>
          );
        }else{
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link href={item.url} target="_blank"><i className={item.icon}></i>{item.name}</Link>
            </li>
          );
        }
      }
    });

    return (
      <div className="navbar-custom">
        <div className="container">
          <div id="navigation">
            <ul className="navigation-menu">
              {rows}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SubHeader;
