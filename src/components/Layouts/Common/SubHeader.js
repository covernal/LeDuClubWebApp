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
    // let menuList = (this.props.menuList == undefined) ? MenuConstants[Cookie.load('type')] : this.props.menuList;
    let menuList = (Cookie.load('type') !== undefined) ? MenuConstants[Cookie.load('type')] : MenuConstants['public'];
    
    menuList.forEach((item, index) => {
      let subMenus = '';
      if(item.sub_menus) {
        let subRows = [];
        item.sub_menus.forEach((sub_item, sIndex) => {
          subRows.push(<li key={`sr-${sIndex}`}><Link to={sub_item.url}>{sub_item.name}</Link></li>);
        });
        subMenus = (
          <ul className="submenu">
            {subRows}
          </ul>
        );
      }   

      if(item.icon){
        if(!this.checkExternalLink(item.url)){
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link to={item.url}><i className={item.icon}></i>{item.name}</Link>
              {subMenus}
            </li>
          );
        }else{
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link href={item.url} target="_blank"><i className={item.icon}></i>{item.name}</Link>
              {subMenus}
            </li>
          );
        }
      }else{
        if(!this.checkExternalLink(item.url)){
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              {(item.url) ? (<Link to={item.url}>{item.name}</Link>) : (<a>{item.name}</a>)}
              {subMenus}
            </li>            
          );
        }else{
          rows.push(
            <li className="has-submenu" key={'subheader_' + index}>
              <Link href={item.url} target="_blank">{item.name}</Link>
              {subMenus}
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
