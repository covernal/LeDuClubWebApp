import React,{PropTypes} from 'react';
import {Link} from 'react-router';

require("../../../assets/templates/images/books/3.jpg");
require("../../../assets/templates/images/books/4.jpg");

class AdminRequestItem extends React.Component{
  render() {
    let item = this.props.item;
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="property-card property-horizontal">
            <div className="row">
              <div className="col-sm-3">
                <div className="property-image" style={{background: `url(${item.image}) center center / cover no-repeat`}}>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="property-content">
                  <div className="listingInfo">
                    <div className="">
                      <p><Link to={`/admin/book/${item.bookId}`} className="text-primary">{item.title}</Link>（ISBN：{item.ISBN})</p>
                      <p className="text-muted">配送地址: {item.address}</p>
                      <p className="text-muted">仓库: {item.store}</p>
                      <p className="text-warning">类型: {item.type}</p>
                      <div className="form-group">
                        <select className="selectpicker show-tick" data-style="btn-default" defaultValue="0">
                          <option value="0" disabled>配送员</option>
                          <option value="1">配送员一</option>
                          <option value="1">配送员二</option>
                        </select>
                      </div>
                      <button type="button" className="btn btn-warning btn-block waves-effect waves-light">分配任务</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>             
    );
  }
}

export default AdminRequestItem;
