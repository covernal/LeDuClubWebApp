import React,{PropTypes} from 'react';

class BookEditForm extends React.Component{
  render() {
    return (      
      <form className="form-horizontal" action="#">
        <div className="form-group">
          <div className="col-xs-12">
            <select className="selectpicker form-control show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>所属仓库</option>
              <option value="1">仓库一</option>
              <option value="1">仓库二</option>
            </select>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="书名"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="ISBN"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="条形码（可选）"/>
          </div>
        </div>

        <div className="form-group ">
          <div className="col-xs-12">
            <input className="form-control" type="text" required="" placeholder="页数"/>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <select className="selectpicker form-control show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>年龄范围</option>
              <option value="1">3-5岁</option>
              <option value="1">6-8岁</option>
              <option value="2">9-12岁</option>
            </select>
          </div>
        </div>

        <div className="col-xs-12">
          <div className="form-group">
            <select className="selectpicker form-control show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>语言</option>
              <option value="1">英语</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <textarea className="form-control" rows="10" placeholder="编辑评论"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-4">
            <div className="text-center m-b-30">
              <button type="submit" className="btn btn-primary btn-block waves-effect waves-light">保存修改</button>
            </div>
          </div>
        </div>        
      </form>
    );
  }
}

export default BookEditForm;
