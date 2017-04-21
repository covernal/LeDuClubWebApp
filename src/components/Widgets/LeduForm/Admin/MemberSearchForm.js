import React,{PropTypes} from 'react';

class MemberSearchForm extends React.Component{
  constructor(props, context) {
    super(props);

    this.state = {
      belongToWarehouseId: '',
      membershipStatus: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.searchMembers(this.state);
  }

  handleChange(type, e) {
    let state = this.state;
    state[type] = e.target.value;
    this.setState(state);
  }

  render() {
    return (     
      <form role="form" className="row" onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-sm-3 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.belongToWarehouseId} onChange={this.handleChange.bind(this, 'belongToWarehouseId')}>
              <option value="" disabled>选择会员所属仓库</option>
              {
                this.props.warehouses.map((item, idx) =>
                  <option key={`warehouse-${idx}`} value={item.objectId}>{item.addressString}</option>
                )
              }
            </select>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" value={this.state.membershipStatus} onChange={this.handleChange.bind(this, 'membershipStatus')}>
              <option value="">选择会员状态</option>
              <option value="waitingForApproval">等待批准</option>
              <option value="pendingForPayment">等待付款</option>
              <option value="confirmed">已确认</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <button type="submit" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-magnify m-r-5"></i>显示会员列表</button>
        </div>
      </form>
    );
  }
}

export default MemberSearchForm;
