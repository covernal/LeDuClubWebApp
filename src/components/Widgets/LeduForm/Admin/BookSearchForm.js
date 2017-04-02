import React,{PropTypes} from 'react';

class BookSearchForm extends React.Component{
  render() {
    return (
      <form role="form" className="row">
        <div className="col-sm-6 col-md-4">
          <div className="form-group">
            <select className="form-control selectpicker show-tick" data-style="btn-default" defaultValue="0">
              <option value="0" disabled>仓库（必选）</option>
              <option value="1">仓库1</option>
              <option value="1">仓库2</option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="form-group ">
            <input className="form-control" type="text" placeholder="ISBN"/>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="form-group ">
            <input className="form-control" type="text" placeholder="书名"/>
          </div>
        </div>
        <div className="col-xs-12 m-b-30 text-center m-t-10">
          <button type="submit" className="btn btn-primary waves-effect waves-light">
            <i className="mdi mdi-magnify m-r-5"></i>搜索
          </button>
        </div>
      </form>
    );
  }
}

export default BookSearchForm;
