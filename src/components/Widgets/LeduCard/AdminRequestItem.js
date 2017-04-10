import React,{PropTypes} from 'react';
import {Link} from 'react-router';

require("../../../assets/templates/images/books/3.jpg");
require("../../../assets/templates/images/books/4.jpg");

class AdminRequestItem extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      postmanId: ''
    };

    this.handleAssign = this.handleAssign.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAssign() {
    this.props.handleAssign(this.props.item.bookId, this.state.postmanId);
  }

  handleChange(e) {
    this.setState({
      postmanId: e.target.value
    });
  }

  render() {
    let item = this.props.item;
    console.log(item);
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
                      <p><Link to={`/admin/book/${item.bookId}`} className="text-primary">{item.title}</Link>（ISBN：{item.ISBN} 仓库: {item.store})</p>
                      <p className="text-muted">配送地址: {item.address}</p>
                      <p className="text-muted">请求时间（北京时间）: {item.datetime}</p>
                      <p className="text-warning">类型: {item.type}</p>
                      <div style={{width: "200px"}}>
                        <div className="form-group">
                          <select className="form-control selectpicker show-tick" data-style="btn-default" value={item.postmanId} onChange={this.handleChange}>
                            <option value="" disabled>配送员</option>
                            <option value="1">配送员一</option>
                            <option value="2">配送员二</option>
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
