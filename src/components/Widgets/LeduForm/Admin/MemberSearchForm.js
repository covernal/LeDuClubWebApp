import React,{PropTypes} from 'react';

class MemberSearchForm extends React.Component{
  render() {
    return (     
      <form role="form" className="row">
        <div className="col-sm-3 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>选择会员所属仓库</option>
              <option value="1">仓库1</option>
              <option value="1">仓库2</option>
            </select>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>选择会员状态</option>
              <option value="1">等待批准</option>
              <option value="1">等待付款</option>
              <option value="1">已确认</option>
              <option value="1">全部</option>
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
