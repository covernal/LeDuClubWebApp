import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

require("../../../assets/templates/images/books/3.jpg");
require("../../../assets/templates/images/books/4.jpg");

class AdminRequestItem extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      postmanId: this.props.postmen[0].objectId
    };

    this.handleAssign = this.handleAssign.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAssign() {
    this.props.handleAssign(this.props.item.objectId, this.state.postmanId);
  }

  handleChange(e) {
    this.setState({
      postmanId: e.target.value
    });
  }

  render() {
    let item = this.props.item;
    let wareHouse = '';
    let createdAt = moment.utc(item.createdAt).add(-8, 'hours').format('YYYY-MM-DD HH:mm');    
    this.props.warehouses.forEach((w, idx)=>{
      if(w.objectId === item.belongToWarehouseId) {
        wareHouse = w.addressString;
        return;
      }
    });
    
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="property-card property-horizontal">
            <div className="row">
              <div className="col-sm-3">
                <div className="property-image" style={{background: `url(${item.book.images[0]}) center center / cover no-repeat`}}>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="property-content">
                  <div className="listingInfo">
                    <div className="">
                      <p><Link to={`/admin/book/${item.bookId}`} className="text-primary">{item.book.bookName}</Link>（ISBN：{item.book.ISBN} 仓库: {wareHouse})</p>
                      <p className="text-muted">配送地址: {item.member.deliveryAddressString}</p>
                      <p className="text-muted">请求时间（北京时间）: {createdAt}</p>
                      <p className="text-warning">类型: {(item.type == "borrrow") ? "借书" : "送书"}</p>
                      <div style={{width: "200px"}}>
                        <div className="form-group">
                          <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.postmanId} onChange={this.handleChange}>
                            <option value="" disabled>配送员</option>
                            {
                              this.props.postmen.map((postman, idx) =>
                                <option key={`postman-${item.objectId}-${idx}`} value={postman.objectId}>{postman.fullName}</option>    
                              )
                            }
                          </select>
                        </div>
                        <button type="button" className="btn btn-warning btn-block waves-effect waves-light" onClick={this.handleAssign}>分配任务</button>
                      </div>
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
